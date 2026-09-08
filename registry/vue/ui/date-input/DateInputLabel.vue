<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DateInput as Ark } from "@ark-ui/vue/date-input";
import { cn } from "cn";
import { dateInput } from "@/registry/shared/lib/date-input.styles";

interface DateInputLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DateInputLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = dateInput();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
