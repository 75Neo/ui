<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn } from "cn";
import { dialog } from "@/registry/shared/lib/dialog.styles";

interface DialogContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DialogContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = dialog();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
