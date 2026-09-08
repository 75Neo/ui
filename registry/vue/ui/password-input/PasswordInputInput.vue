<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cn } from "cn";
import { passwordInputStyles as styles } from "@/registry/shared/lib/password-input.styles";

interface PasswordInputInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PasswordInputInputProps>();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
