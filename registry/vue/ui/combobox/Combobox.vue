<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import type { CollectionItem, ListCollection } from "@ark-ui/vue/collection";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

interface ComboboxProps {
  collection: ListCollection<CollectionItem>;
  defaultValue?: string[];
  defaultInputValue?: string;
  inputBehavior?: "autohighlight" | "autocomplete" | "none";
  selectionBehavior?: "replace" | "clear" | "preserve";
  allowCustomValue?: boolean;
  multiple?: boolean;
  openOnClick?: boolean;
  closeOnSelect?: boolean;
  loopFocus?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
  name?: string;
  form?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ComboboxProps>(), {
  allowCustomValue: undefined,
  multiple: undefined,
  openOnClick: undefined,
  closeOnSelect: undefined,
  loopFocus: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

const value = defineModel<string[]>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :collection="props.collection"
    :default-value="props.defaultValue"
    :default-input-value="props.defaultInputValue"
    :input-behavior="props.inputBehavior"
    :selection-behavior="props.selectionBehavior"
    :allow-custom-value="props.allowCustomValue"
    :multiple="props.multiple"
    :open-on-click="props.openOnClick"
    :close-on-select="props.closeOnSelect"
    :loop-focus="props.loopFocus"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :placeholder="props.placeholder"
    :name="props.name"
    :form="props.form"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
