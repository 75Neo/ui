<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "cn";
import { menuStyles as styles } from "@/registry/shared/lib/menu.styles";

interface MenuArrowProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MenuArrowProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Arrow :class="cn(styles.arrow(), props.class)">
    <slot />
  </Ark.Arrow>
</template>
