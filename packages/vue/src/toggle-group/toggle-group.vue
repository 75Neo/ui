<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { ToggleGroup as Ark } from "@ark-ui/vue/toggle-group";
import { cn, toggleGroupDefaults, type ToggleGroupRootProps } from "@75neo/themes";
import { toggleGroupVariantsKey } from "./variants";
import ToggleGroupItem from "./item.vue";

const props = defineProps<
  ToggleGroupRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the pressed values change. */
  valueChange: [details: { value: string[] }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the group, leaving `defaultValue` idle.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get variant() {
    return props.variant ?? toggleGroupDefaults.variant;
  },
  get color() {
    return props.color ?? toggleGroupDefaults.color;
  },
  get size() {
    return props.size ?? toggleGroupDefaults.size;
  },
  get orientation() {
    return props.orientation ?? toggleGroupDefaults.orientation;
  },
});
provide(toggleGroupVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "inline-flex gap-1 data-disabled:cursor-not-allowed data-disabled:opacity-75 data-[orientation=vertical]:flex-col",
    props.class as string | undefined,
  ),
);
</script>

<template>
  <Ark.Root
    data-slot="toggle-group"
    :class="rootClass"
    :data-variant="resolved.variant"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :data-orientation="resolved.orientation"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    :multiple="props.multiple"
    :deselectable="props.deselectable"
    :disabled="props.disabled"
  >
    <ToggleGroupItem v-for="item in props.items" :key="item.value" :item="item" />
  </Ark.Root>
</template>
