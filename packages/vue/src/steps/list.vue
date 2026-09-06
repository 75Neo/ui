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
  <Ark.List
    data-slot="steps-list"
    :class="
      cn(
        'flex w-full items-center justify-between gap-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.List>
</template>
