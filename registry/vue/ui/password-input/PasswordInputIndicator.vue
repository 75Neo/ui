<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cn } from "cn";
import { passwordInput } from "@/registry/shared/lib/password-input.styles";

interface PasswordInputIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PasswordInputIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = passwordInput();
</script>

<template>
  <Ark.Indicator :class="cn(styles.indicator(), props.class)">
    <slot />
  </Ark.Indicator>
</template>
