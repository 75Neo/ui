<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cn } from "cn";
import { clipboard } from "@/registry/shared/lib/clipboard.styles";

interface ClipboardIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ClipboardIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = clipboard();
</script>

<template>
  <Ark.Indicator :class="cn(styles.indicator(), props.class)">
    <slot />
  </Ark.Indicator>
</template>
