import { Editable } from "@75neo/react/editable";

export function EditablePreview() {
  return (
    <div className="max-w-xs">
      <Editable label="Name" defaultValue="Ada Lovelace" />
    </div>
  );
}
