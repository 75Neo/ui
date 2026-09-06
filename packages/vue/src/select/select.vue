<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { createListCollection, Select as Ark } from "@ark-ui/vue/select";
import { X as XIcon, ChevronDown as ChevronDownIcon } from "@lucide/vue";
import {
  cn,
  selectDefaults,
  selectSizeData,
  type SelectOption,
  type SelectRootProps,
} from "@75neo/themes";
import { selectVariantsKey } from "./variants";
import SelectClearTrigger from "./clear-trigger.vue";
import SelectContent from "./content.vue";
import SelectControl from "./control.vue";
import SelectIndicator from "./indicator.vue";
import SelectItem from "./item.vue";
import SelectItemText from "./item-text.vue";
import SelectLabel from "./label.vue";
import SelectList from "./list.vue";
import SelectTrigger from "./trigger.vue";
import SelectValueText from "./value-text.vue";

/** The item shape this adapter builds its collection from. */
type Item = SelectOption<Component>;

const props = withDefaults(
  defineProps<
    SelectRootProps<Component> & {
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
 * would reach Ark as a value and pin the select to a controlled selection, which would
 * leave `defaultValue` with nothing to do.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? selectDefaults.color;
  },
  get size() {
    return props.size ?? selectDefaults.size;
  },
});
provide(selectVariantsKey, resolved);

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
const indicatorsClass = computed(() =>
  cn(
    "pointer-events-none absolute inset-e-0 flex items-center",
    selectSizeData.indicators[resolved.size],
  ),
);
</script>

<template>
  <Ark.Root
    data-slot="select"
    :class="rootClass"
    :collection="collection"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :multiple="props.multiple"
    :deselectable="props.deselectable"
    :loop-focus="props.loopFocus"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    @open-change="emit('openChange', $event)"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else-if="props.items != null">
      <SelectLabel v-if="props.label != null">{{ props.label }}</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText :placeholder="props.placeholder" />
        </SelectTrigger>
        <span data-slot="select-indicators" :class="indicatorsClass">
          <SelectClearTrigger v-if="props.clearable">
            <component :is="props.clearIcon ?? XIcon" />
          </SelectClearTrigger>
          <SelectIndicator>
            <component :is="props.trailingIcon ?? ChevronDownIcon" />
          </SelectIndicator>
        </span>
      </SelectControl>
      <SelectContent>
        <SelectList>
          <SelectItem
            v-for="item in props.items"
            :key="item.value"
            :item="item"
            :selected-icon="props.selectedIcon"
          >
            <SelectItemText>{{ item.label }}</SelectItemText>
          </SelectItem>
        </SelectList>
      </SelectContent>
      <Ark.HiddenSelect />
    </template>
  </Ark.Root>
</template>
