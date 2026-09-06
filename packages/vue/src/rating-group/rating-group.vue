<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { RatingGroup as Ark } from "@ark-ui/vue/rating-group";
import { Star as StarIcon } from "@lucide/vue";
import { cva } from "class-variance-authority";
import {
  cn,
  ratingFill,
  ratingGroupDefaults,
  ratingGroupFillCompoundData,
  ratingGroupSizeData,
  type RatingGroupRootProps,
} from "@75neo/themes";
import { ratingGroupVariantsKey } from "./variants";
import RatingGroupControl from "./control.vue";
import RatingGroupItem from "./item.vue";
import RatingGroupLabel from "./label.vue";

const ratingGroupFill = cva(
  "pointer-events-none absolute inset-s-0 top-0 h-full w-0 overflow-hidden data-[state=full]:w-full data-[state=half]:w-1/2",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
    },
    compoundVariants: ratingGroupFillCompoundData,
    defaultVariants: ratingGroupDefaults,
  },
);

const props = defineProps<
  RatingGroupRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the rating changes. */
  valueChange: [details: { value: number }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the row, leaving `defaultValue` idle.
 */
const value = defineModel<number | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? ratingGroupDefaults.color;
  },
  get size() {
    return props.size ?? ratingGroupDefaults.size;
  },
});
provide(ratingGroupVariantsKey, resolved);

const rootClass = computed(() => cn("flex flex-col gap-1.5", props.class as string | undefined));
const iconClass = computed(() =>
  cn("block shrink-0 [&>svg]:size-full", ratingGroupSizeData.icon[resolved.size]),
);
const fillClass = computed(() => cn(ratingGroupFill({ color: resolved.color })));
</script>

<template>
  <Ark.Root
    data-slot="rating-group"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :count="props.count ?? 5"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    :allow-half="props.allowHalf"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
  >
    <RatingGroupLabel v-if="props.label != null">{{ props.label }}</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItem v-for="index in props.count ?? 5" :key="index" :index="index">
        <span data-slot="rating-group-icon" :class="iconClass">
          <component :is="props.icon ?? StarIcon" />
        </span>
        <Ark.ItemContext v-slot="item">
          <span
            data-slot="rating-group-fill"
            :data-state="ratingFill(item.highlighted, item.half)"
            :class="fillClass"
          >
            <span data-slot="rating-group-icon" :class="iconClass">
              <component :is="props.icon ?? StarIcon" />
            </span>
          </span>
        </Ark.ItemContext>
      </RatingGroupItem>
    </RatingGroupControl>
    <Ark.HiddenInput />
  </Ark.Root>
</template>
