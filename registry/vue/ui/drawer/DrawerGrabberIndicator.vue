<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawerStyles as styles } from "@/registry/shared/lib/drawer.styles";

interface DrawerGrabberIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerGrabberIndicatorProps>();
</script>

<template>
  <Ark.GrabberIndicator :class="cn(styles.grabberIndicator(), props.class)" />
</template>
