<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawer, type DrawerSize } from "@/registry/shared/lib/drawer.styles";

interface DrawerContentProps {
  size?: DrawerSize;
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = computed(() => drawer({ size: props.size }));
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
