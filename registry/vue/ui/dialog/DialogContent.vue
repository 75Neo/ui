<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn } from "cn";
import { dialog, type DialogSize } from "@/registry/shared/lib/dialog.styles";

interface DialogContentProps {
  size?: DialogSize;
  class?: HTMLAttributes["class"];
}

const props = defineProps<DialogContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = computed(() => dialog({ size: props.size }));
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
