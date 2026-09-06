<script setup lang="ts">
import { computed } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cva } from "class-variance-authority";
import { Eye as EyeIcon } from "@lucide/vue";
import { cn, passwordInputDefaults, passwordInputSizeData } from "@75neo/themes";
import { usePasswordInputVariants } from "./variants";

const passwordInputVisibilityTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed disabled:opacity-50 data-[state=visible]:text-default [&>svg]:size-full",
  {
    variants: { size: passwordInputSizeData.visibilityTrigger },
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
const visibilityTriggerClass = computed(() =>
  cn(passwordInputVisibilityTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.VisibilityTrigger
    data-slot="password-input-visibility-trigger"
    :class="visibilityTriggerClass"
  >
    <slot>
      <component :is="EyeIcon" />
    </slot>
  </Ark.VisibilityTrigger>
</template>
