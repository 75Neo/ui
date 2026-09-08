<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "cn";
import { menuStyles as styles } from "@/registry/shared/lib/menu.styles";

interface MenuArrowTipProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MenuArrowTipProps>();
</script>

<template>
  <Ark.ArrowTip :class="cn(styles.arrowTip(), props.class)" />
</template>
