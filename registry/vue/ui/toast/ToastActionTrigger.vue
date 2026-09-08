<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cn } from "cn";
import { toast } from "@/registry/shared/lib/toast.styles";

interface ToastActionTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ToastActionTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = toast();
</script>

<template>
  <Ark.ActionTrigger :class="cn(styles.actionTrigger(), props.class)">
    <slot />
  </Ark.ActionTrigger>
</template>
