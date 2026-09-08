<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

interface EditableInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<EditableInputProps>();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
