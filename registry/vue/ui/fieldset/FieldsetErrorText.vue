<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Fieldset as Ark } from "@ark-ui/vue/fieldset";
import { cn } from "cn";
import { fieldset } from "@/registry/shared/lib/fieldset.styles";

interface FieldsetErrorTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldsetErrorTextProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fieldset();
</script>

<template>
  <Ark.ErrorText :class="cn(styles.errorText(), props.class)">
    <slot />
  </Ark.ErrorText>
</template>
