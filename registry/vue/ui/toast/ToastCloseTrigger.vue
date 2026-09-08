<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cn } from "cn";
import { toast } from "@/registry/shared/lib/toast.styles";

interface ToastCloseTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ToastCloseTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = toast();
</script>

<template>
  <Ark.CloseTrigger :class="cn(styles.closeTrigger(), props.class)">
    <slot />
  </Ark.CloseTrigger>
</template>
