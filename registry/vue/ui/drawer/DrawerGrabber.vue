<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawerStyles as styles } from "@/registry/shared/lib/drawer.styles";

interface DrawerGrabberProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerGrabberProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Grabber :class="cn(styles.grabber(), props.class)">
    <slot />
  </Ark.Grabber>
</template>
