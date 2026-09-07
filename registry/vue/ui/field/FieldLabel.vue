<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

interface FieldLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = field();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
