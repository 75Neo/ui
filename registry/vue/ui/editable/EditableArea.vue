<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

interface EditableAreaProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<EditableAreaProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Area :class="cn(styles.area(), props.class)">
    <slot />
  </Ark.Area>
</template>
