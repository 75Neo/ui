<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { fieldStyles as styles } from "@/registry/shared/lib/field.styles";

interface FieldSelectProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldSelectProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Select :class="cn(styles.select(), props.class)">
    <slot />
  </Ark.Select>
</template>
