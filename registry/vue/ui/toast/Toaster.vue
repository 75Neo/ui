<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  Toaster as Ark,
  type ToasterProps as ArkToasterProps,
  type ToastOptions,
} from "@ark-ui/vue/toast";
import { cn } from "cn";
import { toast } from "@/registry/shared/lib/toast.styles";

interface ToasterProps {
  toaster: ArkToasterProps["toaster"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<ToasterProps>();

defineSlots<{
  default?: (options: ToastOptions) => unknown;
}>();

const styles = toast();
</script>

<template>
  <Ark :toaster="props.toaster" :class="cn(styles.group(), props.class)">
    <template #default="options">
      <slot v-bind="options" />
    </template>
  </Ark>
</template>
