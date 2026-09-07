<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cn } from "cn";
import { clipboard } from "@/registry/shared/lib/clipboard.styles";

interface ClipboardTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ClipboardTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = clipboard();
</script>

<template>
  <Ark.Trigger :class="cn(styles.trigger(), props.class)">
    <slot />
  </Ark.Trigger>
</template>
