<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawerStyles as styles } from "@/registry/shared/lib/drawer.styles";

interface DrawerDescriptionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerDescriptionProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Description :class="cn(styles.description(), props.class)">
    <slot />
  </Ark.Description>
</template>
