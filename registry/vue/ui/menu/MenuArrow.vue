<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

interface MenuArrowProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MenuArrowProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = menu();
</script>

<template>
  <Ark.Arrow :class="cn(styles.arrow(), props.class)">
    <slot />
  </Ark.Arrow>
</template>
