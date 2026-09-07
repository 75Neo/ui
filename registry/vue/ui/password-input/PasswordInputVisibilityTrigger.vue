<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cn } from "cn";
import { passwordInput } from "@/registry/shared/lib/password-input.styles";

interface PasswordInputVisibilityTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PasswordInputVisibilityTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = passwordInput();
</script>

<template>
  <Ark.VisibilityTrigger :class="cn(styles.visibilityTrigger(), props.class)">
    <slot />
  </Ark.VisibilityTrigger>
</template>
