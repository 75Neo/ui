<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

interface EditableLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<EditableLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = editable();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
