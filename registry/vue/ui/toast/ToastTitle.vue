<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cn } from "cn";
import { toastStyles as styles } from "@/registry/shared/lib/toast.styles";

interface ToastTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ToastTitleProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Title :class="cn(styles.title(), props.class)">
    <slot />
  </Ark.Title>
</template>
