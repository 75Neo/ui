<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cn } from "cn";
import { clipboardStyles as styles } from "@/registry/shared/lib/clipboard.styles";

interface ClipboardValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ClipboardValueTextProps>();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)" />
</template>
