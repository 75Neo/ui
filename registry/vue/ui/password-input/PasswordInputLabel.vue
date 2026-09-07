<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cn } from "cn";
import { passwordInput } from "@/registry/shared/lib/password-input.styles";

interface PasswordInputLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PasswordInputLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = passwordInput();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
