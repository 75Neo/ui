<script setup lang="ts">
import Field from "@/registry/vue/ui/field/Field.vue";
import FieldInput from "@/registry/vue/ui/field/FieldInput.vue";
import FieldLabel from "@/registry/vue/ui/field/FieldLabel.vue";
import Fieldset from "@/registry/vue/ui/fieldset/Fieldset.vue";
import FieldsetHelperText from "@/registry/vue/ui/fieldset/FieldsetHelperText.vue";
import FieldsetLegend from "@/registry/vue/ui/fieldset/FieldsetLegend.vue";
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
