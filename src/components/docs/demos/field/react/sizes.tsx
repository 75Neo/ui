import { Field, FieldInput, FieldLabel } from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function FieldSizes() {
  return (
    <div className="flex max-w-md flex-col gap-5">
      {sizes.map((size) => (
        <Field key={size} size={size}>
          <FieldLabel>{size}</FieldLabel>
          <FieldInput placeholder="Registry item" />
        </Field>
      ))}
    </div>
  );
}
