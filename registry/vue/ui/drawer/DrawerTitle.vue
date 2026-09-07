<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

interface DrawerTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerTitleProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = drawer();
</script>

<template>
  <Ark.Title :class="cn(styles.title(), props.class)">
    <slot />
  </Ark.Title>
</template>
