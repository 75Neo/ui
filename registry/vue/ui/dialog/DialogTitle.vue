<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn } from "cn";
import { dialog } from "@/registry/shared/lib/dialog.styles";

interface DialogTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DialogTitleProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = dialog();
</script>

<template>
  <Ark.Title :class="cn(styles.title(), props.class)">
    <slot />
  </Ark.Title>
</template>
