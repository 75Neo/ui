import {
  Field,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldsetHelperText,
  FieldsetLegend,
} from "@/components/react";

export default function FieldsetOverview() {
  return (
    <Fieldset className="max-w-md">
      <FieldsetLegend>Registry</FieldsetLegend>
      <FieldsetHelperText>Both values go into your components.json.</FieldsetHelperText>

      <Field>
        <FieldLabel>Namespace</FieldLabel>
        <FieldInput defaultValue="@75neo" />
      </Field>

      <Field>
        <FieldLabel>URL</FieldLabel>
        <FieldInput placeholder="https://75neo-ui.pages.dev/r/react/{name}.json" />
      </Field>
    </Fieldset>
  );
}
