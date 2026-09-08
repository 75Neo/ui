<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

interface EditableCancelTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<EditableCancelTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.CancelTrigger :class="cn(styles.cancelTrigger(), props.class)">
    <slot />
  </Ark.CancelTrigger>
</template>
