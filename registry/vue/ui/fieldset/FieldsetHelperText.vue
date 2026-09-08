<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Fieldset as Ark } from "@ark-ui/vue/fieldset";
import { cn } from "cn";
import { fieldset } from "@/registry/shared/lib/fieldset.styles";

interface FieldsetHelperTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldsetHelperTextProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fieldset();
</script>

<template>
  <Ark.HelperText :class="cn(styles.helperText(), props.class)">
    <slot />
  </Ark.HelperText>
</template>
