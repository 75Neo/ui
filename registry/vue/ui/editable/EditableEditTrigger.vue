<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

interface EditableEditTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<EditableEditTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.EditTrigger :class="cn(styles.editTrigger(), props.class)">
    <slot />
  </Ark.EditTrigger>
</template>
