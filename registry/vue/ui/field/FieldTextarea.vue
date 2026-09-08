<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { fieldStyles as styles } from "@/registry/shared/lib/field.styles";

interface FieldTextareaProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldTextareaProps>();
</script>

<template>
  <Ark.Textarea :class="cn(styles.textarea(), props.class)" />
</template>
