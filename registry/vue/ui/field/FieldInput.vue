<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

interface FieldInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldInputProps>();

const styles = field();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
