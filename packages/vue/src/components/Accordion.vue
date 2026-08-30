<script setup lang="ts">
import { computed } from "vue";
import {
  AccordionRoot as ArkRoot,
  AccordionItem as ArkItem,
  AccordionItemTrigger as ArkTrigger,
  AccordionItemContent as ArkContent,
  AccordionItemIndicator as ArkIndicator,
} from "@ark-ui/vue";
import { ChevronDown } from "@lucide/vue";
import { accordion } from "@75neo/styles";
import {
  accordionKey,
  applySlotClass,
  resolveAccordionValue,
  toValueArray,
  type AccordionItemData,
  type AccordionUI,
} from "@75neo/core";
import { useComponentUI } from "../composables/useComponentUI";

type Item = AccordionItemData;

const props = withDefaults(
  defineProps<{
    items?: Item[];
    type?: "single" | "multiple";
    collapsible?: boolean;
    disabled?: boolean;
    defaultValue?: string | string[];
    modelValue?: string | string[];
    ui?: AccordionUI;
    class?: unknown;
  }>(),
  {
    items: undefined,
    type: "single",
    collapsible: true,
    disabled: false,
    defaultValue: undefined,
    modelValue: undefined,
    ui: undefined,
    class: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
  valueChange: [details: { value: string[] }];
  focusChange: [details: { value: string | null }];
}>();

const slots = defineSlots<{
  /** Falls back to `item.leading`. */
  leading?: (bag: { item: Item; index: number }) => unknown;
  /** Falls back to `item.label`. */
  label?: (bag: { item: Item; index: number }) => unknown;
  /** Falls back to `item.trailing`, then a chevron. */
  trailing?: (bag: { item: Item; index: number }) => unknown;
  /** Falls back to `item.content`. */
  content?: (bag: { item: Item; index: number }) => unknown;
}>();

const tvSlots = computed(() => accordion({ disabled: props.disabled }));

const resolved = useComponentUI(
  accordionKey,
  tvSlots,
  computed(() => props.ui),
);

function onUpdateModelValue(value: string[]) {
  emit("update:modelValue", props.type === "single" ? (value[0] ?? "") : value);
}
</script>

<template>
  <ArkRoot
    :multiple="type === 'multiple'"
    :collapsible="collapsible"
    :disabled="disabled"
    :default-value="toValueArray(defaultValue)"
    :model-value="toValueArray(modelValue)"
    data-slot="root"
    :class="resolved.root({ class: props.class as string })"
    @update:model-value="onUpdateModelValue"
    @value-change="emit('valueChange', $event)"
    @focus-change="emit('focusChange', $event)"
  >
    <ArkItem
      v-for="(item, index) in items"
      :key="resolveAccordionValue(item, index)"
      :value="resolveAccordionValue(item, index)"
      :disabled="item.disabled || disabled"
      data-slot="item"
      :class="applySlotClass(resolved.item(), item.ui?.item)"
    >
      <div data-slot="header" :class="applySlotClass(resolved.header(), item.ui?.header)">
        <ArkTrigger
          data-slot="trigger"
          :class="applySlotClass(resolved.trigger(), item.ui?.trigger)"
        >
          <span
            v-if="slots.leading || item.leading"
            data-slot="leading"
            :class="applySlotClass(resolved.leading(), item.ui?.leading)"
          >
            <slot name="leading" :item="item" :index="index">{{ item.leading }}</slot>
          </span>

          <span data-slot="label" :class="applySlotClass(resolved.label(), item.ui?.label)">
            <slot name="label" :item="item" :index="index">{{ item.label }}</slot>
          </span>

          <ArkIndicator
            data-slot="trailing"
            :class="applySlotClass(resolved.trailing(), item.ui?.trailing)"
          >
            <slot name="trailing" :item="item" :index="index">
              <template v-if="item.trailing">{{ item.trailing }}</template>
              <ChevronDown v-else />
            </slot>
          </ArkIndicator>
        </ArkTrigger>
      </div>

      <ArkContent data-slot="content" :class="applySlotClass(resolved.content(), item.ui?.content)">
        <div data-slot="body" :class="applySlotClass(resolved.body(), item.ui?.body)">
          <slot name="content" :item="item" :index="index">{{ item.content }}</slot>
        </div>
      </ArkContent>
    </ArkItem>
  </ArkRoot>
</template>
