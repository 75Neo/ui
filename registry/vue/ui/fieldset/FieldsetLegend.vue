<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Fieldset as Ark } from "@ark-ui/vue/fieldset";
import { cn } from "cn";
import { fieldset } from "@/registry/shared/lib/fieldset.styles";

interface FieldsetLegendProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldsetLegendProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fieldset();
</script>

<template>
  <Ark.Legend :class="cn(styles.legend(), props.class)">
    <slot />
  </Ark.Legend>
</template>
