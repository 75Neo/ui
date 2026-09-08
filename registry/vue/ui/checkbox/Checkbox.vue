<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { cn } from "cn";
import { checkbox, type CheckboxSize, type Intent } from "@/registry/shared/lib/checkbox.styles";

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
  color?: Intent;
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

const checked = defineModel<boolean | "indeterminate">("checked");

defineSlots<{
  default?: () => unknown;
}>();

const styles = computed(() => checkbox({ color: props.color }));
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
