<script setup lang="ts">
import { computed } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cva } from "class-variance-authority";
import { cn, passwordInputDefaults, passwordInputSizeData } from "@75neo/themes";
import { usePasswordInputVariants } from "./variants";

const passwordInputInput = cva(
  "min-w-0 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: { size: passwordInputSizeData.input },
    defaultVariants: passwordInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** Shown while the field is empty. */
  placeholder?: string;
}>();
const variants = usePasswordInputVariants();
const inputClass = computed(() =>
  cn(passwordInputInput(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Input
    data-slot="password-input-input"
    :class="inputClass"
    :placeholder="props.placeholder"
  />
</template>
