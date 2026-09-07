<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

interface DrawerGrabberIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerGrabberIndicatorProps>();

const styles = drawer();
</script>

<template>
  <Ark.GrabberIndicator :class="cn(styles.grabberIndicator(), props.class)" />
</template>
