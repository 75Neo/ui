<script lang="ts">
export interface AccordionItem {
  label?: string;
  content?: string;
  value?: string;
  disabled?: boolean;
  icon?: string;
  trailingIcon?: string;
  slot?: string;
  ui?: {
    item?: string | ((cls: string) => string);
    header?: string | ((cls: string) => string);
    trigger?: string | ((cls: string) => string);
    leadingIcon?: string | ((cls: string) => string);
    label?: string | ((cls: string) => string);
    trailingIcon?: string | ((cls: string) => string);
    content?: string | ((cls: string) => string);
    body?: string | ((cls: string) => string);
  };
}
</script>

<script setup lang="ts" generic="T extends AccordionItem">
import { computed } from "vue";
import {
  AccordionRoot as ArkRoot,
  AccordionItem as ArkItem,
  AccordionItemTrigger as ArkTrigger,
  AccordionItemContent as ArkContent,
  AccordionItemIndicator as ArkIndicator,
} from "@ark-ui/vue";
import { accordion, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../composables/useComponentUI";
import { ChevronDown } from "@lucide/vue";
import { twMerge } from "tailwind-merge";

function applySlotClass(base: string, slotClass?: SlotClass): string {
  if (!slotClass) return base;
  if (typeof slotClass === "function") return slotClass(base);
  return twMerge(base, slotClass);
}

type AccordionUI = {
  root?: SlotClass;
  item?: SlotClass;
  header?: SlotClass;
  trigger?: SlotClass;
  content?: SlotClass;
  body?: SlotClass;
  leadingIcon?: SlotClass;
  trailingIcon?: SlotClass;
  label?: SlotClass;
};

const props = withDefaults(
  defineProps<{
    items?: T[];
    type?: "single" | "multiple";
    collapsible?: boolean;
    disabled?: boolean;
    defaultValue?: string | string[];
    modelValue?: string | string[];
    trailingIcon?: string;
    valueKey?: string;
    labelKey?: string;
    ui?: AccordionUI;
  }>(),
  {
    items: undefined,
    type: "single",
    collapsible: true,
    disabled: false,
    defaultValue: undefined,
    modelValue: undefined,
    trailingIcon: undefined,
    valueKey: "value",
    labelKey: "label",
    ui: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
  valueChange: [details: { value: string[] }];
  focusChange: [details: { value: string | null }];
}>();

function getValue(item: T, index: number): string {
  const record = item as unknown as Record<string, unknown>;
  const keyed = record[props.valueKey];
  if (typeof keyed === "string" && keyed.length > 0) return keyed;
  if (typeof item.value === "string" && item.value.length > 0) return item.value;
  return String(index);
}

function getLabel(item: T): string {
  const record = item as unknown as Record<string, unknown>;
  const keyed = record[props.labelKey];
  if (typeof keyed === "string") return keyed;
  return item.label ?? "";
}

const multiple = computed(() => props.type === "multiple");

const arkDefaultValue = computed(() => {
  if (props.defaultValue == null) return undefined;
  return Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
});

const arkModelValue = computed(() => {
  if (props.modelValue == null) return undefined;
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
});

const tvSlots = computed(() => accordion({ disabled: props.disabled }));

const resolved = useComponentUI(
  "accordion",
  tvSlots,
  computed(() => props.ui),
);

function onUpdateModelValue(value: string[]) {
  if (props.type === "single") {
    emit("update:modelValue", value[0] ?? "");
  } else {
    emit("update:modelValue", value);
  }
}

function onValueChange(details: { value: string[] }) {
  emit("valueChange", details);
}

function onFocusChange(details: { value: string | null }) {
  emit("focusChange", details);
}
</script>

<template>
  <ArkRoot
    :multiple="multiple"
    :collapsible="collapsible"
    :disabled="disabled"
    :default-value="arkDefaultValue"
    :model-value="arkModelValue"
    data-slot="root"
    :class="resolved.root()"
    @update:model-value="onUpdateModelValue"
    @value-change="onValueChange"
    @focus-change="onFocusChange"
  >
    <ArkItem
      v-for="(item, index) in items"
      :key="getValue(item as T, index)"
      :value="getValue(item as T, index)"
      :disabled="item.disabled || disabled"
      data-slot="item"
      :class="applySlotClass(resolved.item(), item.ui?.item)"
    >
      <div data-slot="header" :class="applySlotClass(resolved.header(), item.ui?.header)">
        <ArkTrigger
          data-slot="trigger"
          :class="applySlotClass(resolved.trigger(), item.ui?.trigger)"
        >
          <slot name="leading" :item="item" :index="index">
            <span
              v-if="item.icon"
              data-slot="leadingIcon"
              :class="applySlotClass(resolved.leadingIcon(), item.ui?.leadingIcon)"
            >
              {{ item.icon }}
            </span>
          </slot>

          <span
            v-if="getLabel(item as T) || $slots.default"
            data-slot="label"
            :class="applySlotClass(resolved.label(), item.ui?.label)"
          >
            <slot :item="item" :index="index">{{ getLabel(item as T) }}</slot>
          </span>

          <slot name="trailing" :item="item" :index="index">
            <ArkIndicator
              data-slot="trailingIcon"
              :class="applySlotClass(resolved.trailingIcon(), item.ui?.trailingIcon)"
            >
              <ChevronDown />
            </ArkIndicator>
          </slot>
        </ArkTrigger>
      </div>

      <ArkContent
        v-if="item.content || $slots.content || $slots.body || item.slot"
        data-slot="content"
        :class="applySlotClass(resolved.content(), item.ui?.content)"
      >
        <div data-slot="body" :class="applySlotClass(resolved.body(), item.ui?.body)">
          <slot name="content" :item="item" :index="index">
            <slot name="body" :item="item" :index="index">
              <slot :name="item.slot" :item="item" :index="index">
                {{ item.content }}
              </slot>
            </slot>
          </slot>
        </div>
      </ArkContent>
    </ArkItem>
  </ArkRoot>
</template>
