<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cn } from "cn";
import { toastStyles as styles } from "@/registry/shared/lib/toast.styles";

interface ToastProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ToastProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root :class="cn(styles.root(), props.class)">
    <slot />
  </Ark.Root>
</template>
