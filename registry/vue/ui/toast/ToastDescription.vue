<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cn } from "cn";
import { toast } from "@/registry/shared/lib/toast.styles";

interface ToastDescriptionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ToastDescriptionProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = toast();
</script>

<template>
  <Ark.Description :class="cn(styles.description(), props.class)">
    <slot />
  </Ark.Description>
</template>
