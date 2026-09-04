<script setup lang="ts">
import { type Component, computed } from "vue";
import {
  Listbox as Ark,
  createListCollection,
  type ListboxHighlightChangeDetails,
  type ListboxSelectionDetails,
  type ListboxValueChangeDetails,
} from "@ark-ui/vue/listbox";
import { Check } from "@lucide/vue";
import { listbox, type ListboxItem, type ListboxProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The selection lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model`, holding
 * an array of item values whatever the selection mode.
 */
const props = withDefaults(
  defineProps<
    ListboxProps<Component> & {
      defaultValue?: string[];
      class?: unknown;
      ids?: { root?: string; content?: string; label?: string };
    }
  >(),
  /*
   * Named so Ark receives a real value rather than an `undefined` spread over its
   * own default. Every other boolean here defaults to off, which is what Vue's
   * Boolean casting produces anyway.
   */
  { selectionMode: "single" },
);

const emit = defineEmits<{
  /** Fired when the selection changes. */
  valueChange: [details: ListboxValueChangeDetails<ListboxItem<Component>>];
  /** Fired when the highlighted option changes. */
  highlightChange: [details: ListboxHighlightChangeDetails<ListboxItem<Component>>];
  /** Fired when an option is chosen. */
  select: [details: ListboxSelectionDetails];
}>();

defineSlots<{
  /** Replaces the caption above the list. Falls back to `label`. */
  label?: () => unknown;
  /** Replaces an option's text with arbitrary markup. Falls back to `item.label`. */
  item?: (props: { item: ListboxItem<Component> }) => unknown;
  /** Replaces the message shown when there are no options. Falls back to `emptyMessage`. */
  empty?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the list to a controlled selection, which
 * would leave `defaultValue` with nothing to do.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

/*
 * The item shape is exactly what Ark's collection reads by default — `value`,
 * `label` and `disabled` — so no accessors are passed. Rebuilt whenever the options
 * change, which keeps a changed `items` prop honest.
 */
const collection = computed(() => createListCollection({ items: props.items }));

const theme = useResolvedTheme(
  listbox,
  "listbox",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    :collection="collection"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :selection-mode="props.selectionMode"
    :deselectable="props.deselectable"
    :loop-focus="props.loopFocus"
    :disabled="props.disabled"
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
    @highlight-change="emit('highlightChange', $event)"
    @select="emit('select', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Content data-slot="content" :class="theme.class.content">
      <!--
        Ark renders this only while the collection is empty, so the message and the
        rows never appear together.
      -->
      <Ark.Empty data-slot="empty" :class="theme.class.empty">
        <slot name="empty">{{ props.emptyMessage ?? "No options." }}</slot>
      </Ark.Empty>

      <Ark.Item
        v-for="item in collection.items"
        :key="item.value"
        :item="item"
        data-slot="item"
        :class="theme.class.item"
      >
        <span v-if="item.icon" data-slot="leadingIcon" :class="theme.class.leadingIcon">
          <component :is="item.icon" />
        </span>
        <Ark.ItemText data-slot="itemText" :class="theme.class.itemText">
          <slot name="item" :item="item">{{ item.label }}</slot>
        </Ark.ItemText>
        <Ark.ItemIndicator data-slot="itemIndicator" :class="theme.class.itemIndicator">
          <component :is="props.selectedIcon ?? Check" />
        </Ark.ItemIndicator>
      </Ark.Item>
    </Ark.Content>
  </Ark.Root>
</template>
