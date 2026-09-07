<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

interface DrawerContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = drawer();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
