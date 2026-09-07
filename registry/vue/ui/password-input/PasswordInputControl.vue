<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cn } from "cn";
import { passwordInput } from "@/registry/shared/lib/password-input.styles";

interface PasswordInputControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PasswordInputControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = passwordInput();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
