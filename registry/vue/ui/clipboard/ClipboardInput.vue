<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cn } from "cn";
import { clipboard } from "@/registry/shared/lib/clipboard.styles";

interface ClipboardInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ClipboardInputProps>();

const styles = clipboard();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
