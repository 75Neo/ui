<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn } from "cn";
import { dialog } from "@/registry/shared/lib/dialog.styles";

interface DialogCloseTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DialogCloseTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = dialog();
</script>

<template>
  <Ark.CloseTrigger :class="cn(styles.closeTrigger(), props.class)">
    <slot />
  </Ark.CloseTrigger>
</template>
