<script setup lang="ts">
import { type Component, computed, provide, reactive, ref } from "vue";
import {
  createListCollection,
  Combobox as Ark,
  type ComboboxInputValueChangeDetails,
} from "@ark-ui/vue/combobox";
import { ChevronDown as ChevronDownIcon, X as XIcon } from "@lucide/vue";
import {
  cn,
  comboboxDefaults,
  comboboxFilterText,
  filterComboboxItems,
  type ComboboxOption,
  type ComboboxRootProps,
} from "@75neo/themes";
import { comboboxVariantsKey } from "./variants";
import ComboboxClearTrigger from "./clear-trigger.vue";
import ComboboxContent from "./content.vue";
import ComboboxControl from "./control.vue";
import ComboboxEmpty from "./empty.vue";
import ComboboxInput from "./input.vue";
import ComboboxItem from "./item.vue";
import ComboboxItemText from "./item-text.vue";
import ComboboxLabel from "./label.vue";
import ComboboxList from "./list.vue";
import ComboboxTrigger from "./trigger.vue";

/** The item shape this adapter builds its collection from. */
type Item = ComboboxOption<Component>;

const props = withDefaults(
  defineProps<
    ComboboxRootProps<Component> & {
      class?: unknown;
      collection?: ReturnType<typeof createListCollection<Item>>;
    }
  >(),
  { clearable: true },
);

const emit = defineEmits<{
  /** Fired when the selection changes. */
  valueChange: [details: { value: string[]; items: Item[] }];
  /** Fired when the list opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the combobox to a controlled selection, which
 * would leave `defaultValue` with nothing to do.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? comboboxDefaults.color;
  },
  get size() {
    return props.size ?? comboboxDefaults.size;
  },
});
provide(comboboxVariantsKey, resolved);

const query = ref("");

/*
 * The item shape is exactly what Ark's collection reads by default — `value`,
 * `label` and `disabled` — so no accessors are passed. Filtering here rather than
 * inside Ark's own `useListCollection` keeps a changed `items` prop honest.
 */
const collection = computed(
  () =>
    props.collection ??
    createListCollection({ items: filterComboboxItems(props.items ?? [], query.value) }),
);

function onInputValueChange(details: ComboboxInputValueChangeDetails) {
  query.value = comboboxFilterText(details.inputValue, details.reason);
}

const rootClass = computed(() =>
  cn("flex w-full min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    data-slot="combobox"
    :class="rootClass"
    :collection="collection"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :multiple="props.multiple"
    :open-on-click="props.openOnClick"
    :allow-custom-value="props.allowCustomValue"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    v-model="value"
    :input-value="query"
    @input-value-change="onInputValueChange"
    @value-change="emit('valueChange', $event)"
    @open-change="emit('openChange', $event)"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else-if="props.items != null">
      <ComboboxLabel v-if="props.label != null">{{ props.label }}</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput :placeholder="props.placeholder" />
        <ComboboxClearTrigger v-if="props.clearable">
          <component :is="props.clearIcon ?? XIcon" />
        </ComboboxClearTrigger>
        <ComboboxTrigger>
          <component :is="props.trailingIcon ?? ChevronDownIcon" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxContent>
        <ComboboxEmpty>{{ props.emptyMessage ?? "No results found." }}</ComboboxEmpty>
        <ComboboxList>
          <ComboboxItem
            v-for="item in collection.items"
            :key="item.value"
            :item="item"
            :selected-icon="props.selectedIcon"
          >
            <ComboboxItemText>{{ item.label }}</ComboboxItemText>
          </ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </template>
  </Ark.Root>
</template>
