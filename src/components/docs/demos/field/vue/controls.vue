<script setup lang="ts">
import { Field, FieldInput, FieldLabel, FieldSelect, FieldTextarea } from "@/components/vue";
</script>

<template>
  <div class="flex max-w-md flex-col gap-6">
    <Field>
      <FieldLabel>Item</FieldLabel>
      <FieldInput placeholder="button" />
    </Field>

    <Field>
      <FieldLabel>Adapter</FieldLabel>
      <FieldSelect value="react">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </FieldSelect>
    </Field>

    <Field>
      <FieldLabel>Why are you changing it?</FieldLabel>
      <FieldTextarea placeholder="Kept for the commit message" />
    </Field>
  </div>
</template>
