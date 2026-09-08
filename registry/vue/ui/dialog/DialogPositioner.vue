<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn } from "cn";
import { dialogStyles as styles } from "@/registry/shared/lib/dialog.styles";

interface DialogPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DialogPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
