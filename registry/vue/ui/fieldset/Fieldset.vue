<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Fieldset as Ark } from "@ark-ui/vue/fieldset";
import { cn } from "cn";
import { fieldset } from "@/registry/shared/lib/fieldset.styles";

interface FieldsetProps {
  disabled?: boolean;
  invalid?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FieldsetProps>(), {
  disabled: undefined,
  invalid: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();

const styles = fieldset();
</script>

<template>
  <Ark.Root
    :disabled="props.disabled"
    :invalid="props.invalid"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
