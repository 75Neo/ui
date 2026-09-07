<script setup lang="ts">
import { CircleAlert } from "@lucide/vue";
import Field from "@/registry/vue/ui/field/Field.vue";
import FieldErrorText from "@/registry/vue/ui/field/FieldErrorText.vue";
import FieldHelperText from "@/registry/vue/ui/field/FieldHelperText.vue";
import FieldInput from "@/registry/vue/ui/field/FieldInput.vue";
import FieldLabel from "@/registry/vue/ui/field/FieldLabel.vue";
import FieldRequiredIndicator from "@/registry/vue/ui/field/FieldRequiredIndicator.vue";
import FieldTextarea from "@/registry/vue/ui/field/FieldTextarea.vue";
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

    <Field>
      <FieldLabel>Why are you changing it?</FieldLabel>
      <FieldTextarea placeholder="Kept for the commit message" />
    </Field>
  </div>
</template>
