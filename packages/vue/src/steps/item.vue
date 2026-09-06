<script setup lang="ts">
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "@75neo/themes";

const props = defineProps<{
  index: number;
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item
    data-slot="steps-item"
    :index="props.index"
    :class="
      cn(
        'flex min-w-0 flex-1 items-center gap-2 last:flex-none data-[orientation=vertical]:items-start',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Item>
</template>
