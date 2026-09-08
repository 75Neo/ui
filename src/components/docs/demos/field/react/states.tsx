import { CircleAlert } from "lucide-react";
import {
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldInput,
  FieldLabel,
  FieldRequiredIndicator,
} from "@/components/react";

export default function FieldStates() {
  return (
    <div className="flex max-w-md flex-col gap-6">
      <Field required>
        <FieldLabel>
          Registry URL
          <FieldRequiredIndicator>*</FieldRequiredIndicator>
        </FieldLabel>
        <FieldInput placeholder="https://75neo-ui.pages.dev/r/react/{name}.json" />
        <FieldHelperText>The CLI reads this from your components.json.</FieldHelperText>
      </Field>

      <Field invalid>
        <FieldLabel>Component name</FieldLabel>
        <FieldInput defaultValue="Button" />
        <FieldErrorText>
          <CircleAlert />
          Item names are lower case and hyphenated.
        </FieldErrorText>
      </Field>

      <Field disabled>
        <FieldLabel>Locked</FieldLabel>
        <FieldInput defaultValue="Not editable" />
      </Field>
    </div>
  );
}
