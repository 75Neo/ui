<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PinInput as Ark } from "@ark-ui/vue/pin-input";
import { cn } from "cn";
import { pinInput } from "@/registry/shared/lib/pin-input.styles";

interface PinInputInputProps {
  index: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<PinInputInputProps>();

const styles = pinInput();
</script>

<template>
  <Ark.Input :index="props.index" :class="cn(styles.input(), props.class)" />
</template>
