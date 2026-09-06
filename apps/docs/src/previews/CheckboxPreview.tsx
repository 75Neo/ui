import { Checkbox } from "@75neo/react/checkbox";

export function CheckboxPreview() {
  return (
    <div className="max-w-xs">
      <Checkbox label="Notifications" description="Email me about mentions." />
    </div>
  );
}
