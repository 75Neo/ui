<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cn } from "cn";
import { toastStyles as styles } from "@/registry/shared/lib/toast.styles";

interface ToastDescriptionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ToastDescriptionProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Description :class="cn(styles.description(), props.class)">
    <slot />
  </Ark.Description>
</template>
