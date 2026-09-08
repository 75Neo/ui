<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

interface EditableProps {
  defaultValue?: string;
  defaultEdit?: boolean;
  activationMode?: "focus" | "dblclick" | "click" | "none";
  submitMode?: "blur" | "enter" | "both" | "none";
  autoResize?: boolean;
  maxLength?: number;
  placeholder?: string;
  selectOnFocus?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<EditableProps>(), {
  defaultEdit: undefined,
  autoResize: undefined,
  selectOnFocus: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

const value = defineModel<string>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :default-edit="props.defaultEdit"
    :activation-mode="props.activationMode"
    :submit-mode="props.submitMode"
    :auto-resize="props.autoResize"
    :max-length="props.maxLength"
    :placeholder="props.placeholder"
    :select-on-focus="props.selectOnFocus"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :form="props.form"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
