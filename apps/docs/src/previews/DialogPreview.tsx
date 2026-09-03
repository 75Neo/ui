import { Button, Dialog } from "@75neo/react";

export function DialogPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Dialog
        title="Delete this project?"
        description="This cannot be undone."
        body={
          <p>
            Deleting it removes every theme and adapter built from it. Members keep their accounts.
          </p>
        }
        footer={
          <>
            <Button variant="ghost" color="neutral" size="sm">
              Cancel
            </Button>
            <Button color="error" size="sm">
              Delete
            </Button>
          </>
        }
      >
        <Button variant="outline" color="neutral">
          Open a dialog
        </Button>
      </Dialog>

      <Dialog
        size="lg"
        role="alertdialog"
        dismissible={false}
        title="Your session is about to expire"
        description="Escape and a click outside do nothing here."
        body={<p>You will be signed out in two minutes unless you carry on.</p>}
        footer={
          <Button color="warning" size="sm">
            Stay signed in
          </Button>
        }
      >
        <Button variant="outline" color="neutral">
          Not dismissible
        </Button>
      </Dialog>
    </div>
  );
}
