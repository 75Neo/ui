<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cva } from "class-variance-authority";
import {
  cn,
  segmentGroupDefaults,
  segmentGroupOrientationData,
  segmentGroupSizeData,
  type SegmentGroupRootProps,
} from "@75neo/themes";
import { segmentGroupVariantsKey } from "./variants";
import SegmentGroupIndicator from "./indicator.vue";
import SegmentGroupItem from "./item.vue";
import SegmentGroupItemText from "./item-text.vue";

const segmentGroupRoot = cva(
  "relative isolate inline-flex rounded-md bg-elevated data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      size: segmentGroupSizeData.base,
      orientation: segmentGroupOrientationData.base,
    },
    defaultVariants: segmentGroupDefaults,
  },
);

const props = defineProps<
  SegmentGroupRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the choice changes. */
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
    return props.color ?? segmentGroupDefaults.color;
  },
  get size() {
    return props.size ?? segmentGroupDefaults.size;
  },
  get orientation() {
    return props.orientation ?? segmentGroupDefaults.orientation;
  },
});
provide(segmentGroupVariantsKey, resolved);

const rootClass = computed(() => cn(segmentGroupRoot(resolved), props.class as string | undefined));
</script>

<template>
  <Ark.Root
    data-slot="segment-group"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :data-orientation="resolved.orientation"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    :orientation="resolved.orientation"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
  >
    <SegmentGroupIndicator />
    <SegmentGroupItem v-for="item in props.items" :key="item.value" :item="item">
      <SegmentGroupItemText>{{ item.label }}</SegmentGroupItemText>
    </SegmentGroupItem>
  </Ark.Root>
</template>
