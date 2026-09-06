<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { cn, radioGroupDefaults, type RadioGroupRootProps } from "@75neo/themes";
import { radioGroupVariantsKey } from "./variants";
import RadioGroupItem from "./item.vue";
import RadioGroupLegend from "./legend.vue";

const props = defineProps<
  RadioGroupRootProps & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired whenever a different option is picked. */
  valueChange: [details: { value: string | null }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the group, leaving `defaultValue` idle.
 */
const value = defineModel<string | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? radioGroupDefaults.color;
  },
  get size() {
    return props.size ?? radioGroupDefaults.size;
  },
});
provide(radioGroupVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "group/radio flex min-w-0 flex-col gap-2 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:items-start",
    props.class as string | undefined,
  ),
);
</script>

<template>
  <Ark.Root
    data-slot="radio-group"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    :orientation="props.orientation"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
  >
    <RadioGroupLegend v-if="props.legend != null">{{ props.legend }}</RadioGroupLegend>
    <RadioGroupItem v-for="item in props.items" :key="item.value" :item="item" />
  </Ark.Root>
</template>
