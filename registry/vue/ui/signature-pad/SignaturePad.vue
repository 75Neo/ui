<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SignaturePad as Ark } from "@ark-ui/vue/signature-pad";
import { cn } from "cn";
import { signaturePadStyles as styles } from "@/registry/shared/lib/signature-pad.styles";

interface SignaturePadProps {
  defaultPaths?: string[];
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SignaturePadProps>(), {
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
});

const paths = defineModel<string[]>("paths");

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:paths="paths"
    :default-paths="props.defaultPaths"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
