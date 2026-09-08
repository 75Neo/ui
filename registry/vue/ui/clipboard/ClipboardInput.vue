<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cn } from "cn";
import { clipboardStyles as styles } from "@/registry/shared/lib/clipboard.styles";

interface ClipboardInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ClipboardInputProps>();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
