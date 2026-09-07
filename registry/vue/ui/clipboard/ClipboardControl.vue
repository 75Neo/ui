<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cn } from "cn";
import { clipboard } from "@/registry/shared/lib/clipboard.styles";

interface ClipboardControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ClipboardControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = clipboard();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
