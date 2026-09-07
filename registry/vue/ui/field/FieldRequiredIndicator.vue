<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

interface FieldRequiredIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldRequiredIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = field();
</script>

<template>
  <Ark.RequiredIndicator :class="cn(styles.requiredIndicator(), props.class)">
    <slot />
  </Ark.RequiredIndicator>
</template>
