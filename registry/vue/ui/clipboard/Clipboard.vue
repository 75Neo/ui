<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cn } from "cn";
import { clipboard } from "@/registry/shared/lib/clipboard.styles";

interface ClipboardProps {
  defaultValue?: string;
  timeout?: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ClipboardProps>();

const value = defineModel<string>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = clipboard();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :timeout="props.timeout"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
