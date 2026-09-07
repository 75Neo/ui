<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

interface DrawerPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = drawer();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
