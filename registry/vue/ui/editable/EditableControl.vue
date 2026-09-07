<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

interface EditableControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<EditableControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = editable();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
