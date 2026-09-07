<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { cn } from "cn";
import { checkbox, type CheckboxSize } from "@/registry/shared/lib/checkbox.styles";

interface CheckboxProps {
  defaultChecked?: boolean | "indeterminate";
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  form?: string;
  size?: CheckboxSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  defaultChecked: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
  size: "md",
});

const checked = defineModel<boolean | "indeterminate">("checked", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

const styles = checkbox();
</script>

<template>
  <Ark.Root
    v-model:checked="checked"
    :default-checked="props.defaultChecked"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :value="props.value"
    :form="props.form"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
