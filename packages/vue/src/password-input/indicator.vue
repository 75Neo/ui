<script setup lang="ts">
import { computed } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { cva } from "class-variance-authority";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "@lucide/vue";
import { cn, passwordInputDefaults, passwordInputSizeData } from "@75neo/themes";
import { usePasswordInputVariants } from "./variants";

const passwordInputIndicator = cva("inline-flex items-center justify-center [&>svg]:size-full", {
  variants: { size: passwordInputSizeData.indicator },
  defaultVariants: passwordInputDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
  /** Shown while the secret is hidden. */
  fallback?: () => unknown;
}>();

const variants = usePasswordInputVariants();
const indicatorClass = computed(() =>
  cn(passwordInputIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator data-slot="password-input-indicator" :class="indicatorClass">
    <slot>
      <component :is="EyeIcon" />
    </slot>
    <template #fallback>
      <slot name="fallback">
        <component :is="EyeOffIcon" />
      </slot>
    </template>
  </Ark.Indicator>
</template>
