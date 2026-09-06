<script setup lang="ts">
import { computed } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { X as XIcon } from "@lucide/vue";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const closeTriggerClass = computed(() =>
  cn(
    "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 disabled:cursor-not-allowed [&>svg]:size-full",
    props.class as string | undefined,
  ),
);
</script>

<template>
  <Ark.CloseTrigger
    data-slot="drawer-close-trigger"
    :class="closeTriggerClass"
    aria-label="Close drawer"
  >
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.CloseTrigger>
</template>
