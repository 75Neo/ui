<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cn } from "cn";
import { numberInputStyles as styles } from "@/registry/shared/lib/number-input.styles";

interface NumberInputInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<NumberInputInputProps>();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
