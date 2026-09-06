<script setup lang="ts">
import { computed } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cva } from "class-variance-authority";
import {
  cn,
  passwordInputControlCompoundData,
  passwordInputDefaults,
  passwordInputSizeData,
} from "@75neo/themes";
import { usePasswordInputVariants } from "./variants";

const passwordInputControl = cva(
  "flex w-full min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: passwordInputSizeData.control,
    },
    compoundVariants: passwordInputControlCompoundData,
    defaultVariants: passwordInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = usePasswordInputVariants();
const controlClass = computed(() =>
  cn(passwordInputControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="password-input-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
