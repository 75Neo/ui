import { Field, FieldInput, FieldLabel, FieldSelect, FieldTextarea } from "@/components/react";

export default function FieldControls() {
  return (
    <div className="flex max-w-md flex-col gap-6">
      <Field>
        <FieldLabel>Item</FieldLabel>
        <FieldInput placeholder="button" />
      </Field>

      <Field>
        <FieldLabel>Adapter</FieldLabel>
        <FieldSelect defaultValue="react">
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </FieldSelect>
      </Field>

      <Field>
        <FieldLabel>Why are you changing it?</FieldLabel>
        <FieldTextarea placeholder="Kept for the commit message" />
      </Field>
    </div>
  );
}
