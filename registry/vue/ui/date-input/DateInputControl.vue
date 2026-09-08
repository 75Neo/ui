<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DateInput as Ark } from "@ark-ui/vue/date-input";
import { cn } from "cn";
import { dateInputStyles as styles } from "@/registry/shared/lib/date-input.styles";

interface DateInputControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DateInputControlProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
