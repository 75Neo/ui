<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cn } from "cn";
import { passwordInput } from "@/registry/shared/lib/password-input.styles";

interface PasswordInputProps {
  defaultVisible?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  ignorePasswordManagers?: boolean;
  name?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PasswordInputProps>(), {
  defaultVisible: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
  ignorePasswordManagers: undefined,
});

const visible = defineModel<boolean>("visible");

defineSlots<{
  default?: () => unknown;
}>();

const styles = passwordInput();
</script>

<template>
  <Ark.Root
    v-model:visible="visible"
    :default-visible="props.defaultVisible"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :ignore-password-managers="props.ignorePasswordManagers"
    :name="props.name"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
