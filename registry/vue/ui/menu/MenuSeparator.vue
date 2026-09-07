<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

interface MenuSeparatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MenuSeparatorProps>();

const styles = menu();
</script>

<template>
  <Ark.Separator :class="cn(styles.separator(), props.class)" />
</template>
