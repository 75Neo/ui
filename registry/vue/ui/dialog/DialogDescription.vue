<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn } from "cn";
import { dialog } from "@/registry/shared/lib/dialog.styles";

interface DialogDescriptionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DialogDescriptionProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = dialog();
</script>

<template>
  <Ark.Description :class="cn(styles.description(), props.class)">
    <slot />
  </Ark.Description>
</template>
