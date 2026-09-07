<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

interface NumberInputValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<NumberInputValueTextProps>();

const styles = numberInput();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)" />
</template>
