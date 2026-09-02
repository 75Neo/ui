import { Checkbox } from "@75neo/react";

export function CheckboxPreview() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Remember this device" defaultChecked />
      <Checkbox
        label="Weekly digest"
        description="One email on Monday with everything that changed."
        color="success"
      />
      <Checkbox label="Partially selected" defaultChecked="indeterminate" size="lg" />
    </div>
  );
}
