<script setup lang="ts">
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger
    data-slot="steps-trigger"
    :class="
      cn(
        'flex min-w-0 cursor-pointer items-center gap-2.5 rounded-md outline-primary/25 focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Trigger>
</template>
