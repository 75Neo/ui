<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import {
  createListCollection,
  Listbox as Ark,
  type ListboxSelectionDetails,
} from "@ark-ui/vue/listbox";
import { cn, listboxDefaults, type ListboxOption, type ListboxRootProps } from "@75neo/themes";
import { listboxVariantsKey } from "./variants";
import ListboxContent from "./content.vue";
import ListboxEmpty from "./empty.vue";
import ListboxItem from "./item.vue";
import ListboxItemText from "./item-text.vue";
import ListboxLabel from "./label.vue";

/** The item shape this adapter builds its collection from. */
type Item = ListboxOption<Component>;

const props = defineProps<
  ListboxRootProps<Component> & {
    class?: unknown;
    collection?: ReturnType<typeof createListCollection<Item>>;
  }
>();

const emit = defineEmits<{
  /** Fired when the selection changes. */
  valueChange: [details: { value: string[]; items: Item[] }];
  /** Fired when the highlighted option changes. */
  highlightChange: [details: { highlightedValue: string | null }];
  /** Fired when an option is chosen. */
  select: [details: ListboxSelectionDetails];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the listbox to a controlled selection, which would
 * leave `defaultValue` with nothing to do.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? listboxDefaults.color;
  },
  get size() {
    return props.size ?? listboxDefaults.size;
  },
});
provide(listboxVariantsKey, resolved);

/*
 * The item shape is exactly what Ark's collection reads by default — `value`,
 * `label` and `disabled` — so no accessors are passed. A caller-built collection
 * hands the rows to the caller instead.
 */
const collection = computed(
  () => props.collection ?? createListCollection({ items: props.items ?? [] }),
);

const rootClass = computed(() =>
  cn("flex w-full min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    data-slot="listbox"
    :class="rootClass"
    :collection="collection"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :selection-mode="props.selectionMode"
    :deselectable="props.deselectable"
    :loop-focus="props.loopFocus"
    :disabled="props.disabled"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    @highlight-change="emit('highlightChange', $event)"
    @select="emit('select', $event)"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else-if="props.items != null">
      <ListboxLabel v-if="props.label != null">{{ props.label }}</ListboxLabel>
      <ListboxContent>
        <ListboxEmpty>{{ props.emptyMessage ?? "No options." }}</ListboxEmpty>
        <ListboxItem
          v-for="item in props.items"
          :key="item.value"
          :item="item"
          :selected-icon="props.selectedIcon"
        >
          <ListboxItemText>{{ item.label }}</ListboxItemText>
        </ListboxItem>
      </ListboxContent>
    </template>
  </Ark.Root>
</template>
