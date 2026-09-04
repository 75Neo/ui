<script setup lang="ts">
import { type Component } from "vue";
import { ToggleGroup as Ark } from "@ark-ui/vue/toggle-group";
import { toggleGroup, type ToggleGroupProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The selection lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model`, with
 * `defaultValue` as the uncontrolled counterpart Ark's root already takes.
 */
const props = withDefaults(
  defineProps<
    ToggleGroupProps<Component> & {
      class?: unknown;
      defaultValue?: string[];
      ids?: { root?: string; item?: (value: string) => string };
    }
  >(),
  /*
   * Ark releases a pressed item when pressed again unless told otherwise, and Vue
   * casts an absent Boolean prop to `false`. Left unnamed, `deselectable` would reach
   * Ark as an explicit `false` and single-select groups would stick in Vue while
   * React released them.
   */
  { deselectable: true },
);

const emit = defineEmits<{
  /** Fired whenever the selection changes. */
  valueChange: [details: { value: string[] }];
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the group to a controlled selection, which would
 * leave `defaultValue` with nothing to do.
 */
const modelValue = defineModel<string[] | undefined>({ default: undefined });

const theme = useResolvedTheme(
  toggleGroup,
  "toggleGroup",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="modelValue"
    data-slot="base"
    :class="theme.class.base"
    :orientation="props.orientation"
    :disabled="props.disabled"
    :multiple="props.multiple"
    :deselectable="props.deselectable"
    :default-value="props.defaultValue"
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
  >
    <Ark.Item
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      data-slot="item"
      :class="theme.class.item"
    >
      <span v-if="item.icon" data-slot="leadingIcon" :class="theme.class.leadingIcon">
        <component :is="item.icon" />
      </span>
      <span v-if="item.label != null" data-slot="itemText" :class="theme.class.itemText">
        {{ item.label }}
      </span>
    </Ark.Item>
  </Ark.Root>
</template>
