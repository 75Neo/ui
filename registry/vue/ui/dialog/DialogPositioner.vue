<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn } from "cn";
import { dialog } from "@/registry/shared/lib/dialog.styles";

interface DialogPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DialogPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = dialog();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
