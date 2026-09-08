import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
} from "@/components/react";

export default function EditableOverview() {
  return (
    <div className="max-w-md">
      <Editable defaultValue="Primary action" placeholder="Name this component">
        <EditableLabel>Component title</EditableLabel>
        <EditableArea>
          <EditablePreview />
          <EditableInput />
        </EditableArea>
        <EditableControl>
          <EditableEditTrigger>Edit</EditableEditTrigger>
          <EditableSubmitTrigger>Save</EditableSubmitTrigger>
          <EditableCancelTrigger>Cancel</EditableCancelTrigger>
        </EditableControl>
      </Editable>
    </div>
  );
}
