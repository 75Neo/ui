<script setup lang="ts">
import { CircleAlert } from "@lucide/vue";
import {
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldInput,
  FieldLabel,
  FieldRequiredIndicator,
} from "@/components/vue";
</script>

<template>
  <div class="flex max-w-md flex-col gap-6">
    <Field required>
      <FieldLabel>
        Registry URL
        <FieldRequiredIndicator>*</FieldRequiredIndicator>
      </FieldLabel>
      <FieldInput placeholder="https://75neo-ui.pages.dev/r/vue/{name}.json" />
      <FieldHelperText>The CLI reads this from your components.json.</FieldHelperText>
    </Field>

    <Field invalid>
      <FieldLabel>Component name</FieldLabel>
      <FieldInput value="Button" />
      <FieldErrorText>
        <CircleAlert />
        Item names are lower case and hyphenated.
      </FieldErrorText>
    </Field>

    <Field disabled>
      <FieldLabel>Locked</FieldLabel>
      <FieldInput value="Not editable" />
    </Field>
  </div>
</template>
