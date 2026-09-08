<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawerStyles as styles } from "@/registry/shared/lib/drawer.styles";

interface DrawerBackdropProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerBackdropProps>();
</script>

<template>
  <Ark.Backdrop :class="cn(styles.backdrop(), props.class)" />
</template>
