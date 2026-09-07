<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

interface EditableSubmitTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<EditableSubmitTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = editable();
</script>

<template>
  <Ark.SubmitTrigger :class="cn(styles.submitTrigger(), props.class)">
    <slot />
  </Ark.SubmitTrigger>
</template>
