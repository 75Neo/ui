<script setup lang="ts">
import { type Component, computed, onMounted, ref } from "vue";
import {
  Combobox as Ark,
  type ComboboxInputValueChangeDetails,
  createListCollection,
} from "@ark-ui/vue/combobox";
import { Check, ChevronDown, X } from "@lucide/vue";
import {
  combobox,
  type ComboboxItem,
  comboboxFilterText,
  type ComboboxProps,
  filterComboboxItems,
} from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The selection lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model`, holding an
 * array of item values whatever the selection mode.
 */
const props = withDefaults(
  defineProps<
    ComboboxProps<Component> & {
      defaultValue?: string[];
      class?: unknown;
    }
  >(),
  /*
   * `clearable` is the one prop here whose default is `true`, and it is exactly the
   * prop Vue's Boolean casting would get wrong: an absent Boolean-typed prop arrives as
   * `false`, so the clear button would never render unless a caller asked for it by
   * name. Every other boolean below defaults to off, which is what the cast produces
   * anyway.
   */
  { clearable: true },
);

const emit = defineEmits<{
  /** Fired when the selection changes. */
  valueChange: [details: { value: string[]; items: ComboboxItem<Component>[] }];
  /** Fired when the list opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** Replaces the caption above the field. Falls back to `label`. */
  label?: () => unknown;
  /** Replaces an option's text with arbitrary markup. Falls back to `item.label`. */
  item?: (props: { item: ComboboxItem<Component> }) => unknown;
  /** Replaces the message shown when nothing matches. Falls back to `emptyMessage`. */
  empty?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the combobox to a controlled selection, which
 * would leave `defaultValue` with nothing to do.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

const query = ref("");

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the popup is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

/*
 * The item shape is exactly what Ark's collection reads by default — `value`, `label`
 * and `disabled` — so no accessors are passed. Rebuilt whenever the options or the
 * query change, which is why filtering here rather than inside Ark's own
 * `useListCollection` keeps a changed `items` prop honest.
 */
const collection = computed(() =>
  createListCollection({ items: filterComboboxItems(props.items, query.value) }),
);

const theme = useResolvedTheme(
  combobox,
  "combobox",
  () => props,
  () => props.class as string | undefined,
);

function onInputValueChange(details: ComboboxInputValueChangeDetails) {
  query.value = comboboxFilterText(details.inputValue, details.reason);
}
</script>

<template>
  <Ark.Root
    v-model="value"
    :collection="collection"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :multiple="props.multiple"
    :open-on-click="props.openOnClick"
    :allow-custom-value="props.allowCustomValue"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    @input-value-change="onInputValueChange"
    @value-change="emit('valueChange', $event)"
    @open-change="emit('openChange', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <Ark.Input data-slot="input" :class="theme.class.input" />
      <Ark.ClearTrigger
        v-if="props.clearable"
        data-slot="clearTrigger"
        :class="theme.class.clearTrigger"
      >
        <component :is="props.clearIcon ?? X" />
      </Ark.ClearTrigger>
      <Ark.Trigger data-slot="trigger" :class="theme.class.trigger">
        <component :is="props.trailingIcon ?? ChevronDown" />
      </Ark.Trigger>
    </Ark.Control>

    <!--
      Teleported so an ancestor with `overflow: hidden` cannot clip it. The teleport
      is disabled until mount, which keeps the server pass and the first client render
      identical and leaves nothing for hydration to reconcile — the same thing Ark's
      React Portal does on the other adapter.
    -->
    <Teleport to="body" :disabled="!mounted">
      <Ark.Positioner data-slot="positioner" :class="theme.class.positioner">
        <Ark.Content data-slot="content" :class="theme.class.content">
          <!--
          Ark renders this only while the collection is empty, so the message and the
          list never appear together.
        -->
          <Ark.Empty data-slot="empty" :class="theme.class.empty">
            <slot name="empty">{{ props.emptyMessage ?? "No results found." }}</slot>
          </Ark.Empty>

          <Ark.List data-slot="list" :class="theme.class.list">
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
          </Ark.List>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>
