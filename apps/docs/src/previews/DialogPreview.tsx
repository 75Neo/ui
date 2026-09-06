import { Dialog } from "@75neo/react/dialog";

export function DialogPreview() {
  return (
    <Dialog
      title="Delete project?"
      description="This cannot be undone."
      body="The project and its history leave the workspace for good."
      footer="Cancel"
    >
      <button type="button">Delete</button>
    </Dialog>
  );
}
