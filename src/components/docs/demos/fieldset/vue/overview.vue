<script setup lang="ts">
import {
  Field,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldsetHelperText,
  FieldsetLegend,
} from "@/components/vue";
</script>

<template>
  <Fieldset class="max-w-md">
    <FieldsetLegend>Registry</FieldsetLegend>
    <FieldsetHelperText>Both values go into your components.json.</FieldsetHelperText>

    <Field>
      <FieldLabel>Namespace</FieldLabel>
      <FieldInput value="@75neo" />
    </Field>

    <Field>
      <FieldLabel>URL</FieldLabel>
      <FieldInput placeholder="https://75neo-ui.pages.dev/r/vue/{name}.json" />
    </Field>
  </Fieldset>
</template>
