<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cn } from "cn";
import { clipboardStyles as styles } from "@/registry/shared/lib/clipboard.styles";

interface ClipboardLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ClipboardLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
