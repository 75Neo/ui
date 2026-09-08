<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DateInput as Ark } from "@ark-ui/vue/date-input";
import { cn } from "cn";
import { dateInput } from "@/registry/shared/lib/date-input.styles";

interface DateInputControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DateInputControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = dateInput();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
