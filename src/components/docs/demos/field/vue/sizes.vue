<script setup lang="ts">
import { Field, FieldInput, FieldLabel } from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex max-w-md flex-col gap-5">
    <Field v-for="size in sizes" :key="size" :size="size">
      <FieldLabel>{{ size }}</FieldLabel>
      <FieldInput placeholder="Registry item" />
    </Field>
  </div>
</template>
