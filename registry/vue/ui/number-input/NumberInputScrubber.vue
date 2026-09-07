<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

interface NumberInputScrubberProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<NumberInputScrubberProps>();

const styles = numberInput();
</script>

<template>
  <Ark.Scrubber :class="cn(styles.scrubber(), props.class)" />
</template>
