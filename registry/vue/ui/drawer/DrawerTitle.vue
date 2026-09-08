<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawerStyles as styles } from "@/registry/shared/lib/drawer.styles";

interface DrawerTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerTitleProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Title :class="cn(styles.title(), props.class)">
    <slot />
  </Ark.Title>
</template>
