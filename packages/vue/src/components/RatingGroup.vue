<script setup lang="ts">
import type { Component } from "vue";
import { RatingGroup as Ark } from "@ark-ui/vue/rating-group";
import { Star } from "@lucide/vue";
import { ratingFill, ratingGroup, type RatingGroupProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The value lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model`, holding a number.
 */
const props = withDefaults(
  defineProps<
    RatingGroupProps<Component> & {
      defaultValue?: number;
      class?: unknown;
    }
  >(),
  { count: 5 },
);

const emit = defineEmits<{
  /** Fired when the rating changes. */
  valueChange: [details: { value: number }];
}>();

defineSlots<{
  /** Replaces the caption above the row. Falls back to `label`. */
  label?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the row to a controlled rating, which would leave
 * `defaultValue` with nothing to do.
 */
const value = defineModel<number | undefined>({ default: undefined });

const theme = useResolvedTheme(
  ratingGroup,
  "ratingGroup",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    data-slot="base"
    :class="theme.class.base"
    :count="props.count"
    :default-value="props.defaultValue"
    :allow-half="props.allowHalf"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    @value-change="emit('valueChange', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <Ark.Item
        v-for="index in props.count"
        :key="index"
        :index="index"
        data-slot="item"
        :class="theme.class.item"
      >
        <!--
          The empty outline underneath, and the filled star on top inside a box clipped
          to nothing, half, or the whole width.
        -->
        <span data-slot="icon" :class="theme.class.icon">
          <component :is="props.icon ?? Star" />
        </span>
        <Ark.ItemContext v-slot="item">
          <span
            data-slot="fill"
            :data-state="ratingFill(item.highlighted, item.half)"
            :class="theme.class.fill"
          >
            <span data-slot="icon" :class="theme.class.icon">
              <component :is="props.icon ?? Star" />
            </span>
          </span>
        </Ark.ItemContext>
      </Ark.Item>
    </Ark.Control>

    <!--
      The one part with no slot of its own: it is hidden by contract, so a class on it
      would style nothing. It is what puts the rating into a form.
    -->
    <Ark.HiddenInput />
  </Ark.Root>
</template>
