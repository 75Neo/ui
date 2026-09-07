<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

interface DrawerCloseTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerCloseTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = drawer();
</script>

<template>
  <Ark.CloseTrigger :class="cn(styles.closeTrigger(), props.class)">
    <slot />
  </Ark.CloseTrigger>
</template>
