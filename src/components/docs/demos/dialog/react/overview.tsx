import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from "@/components/react";

export default function DialogOverview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Remove the button</Button>
      </DialogTrigger>

      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Remove the button?</DialogTitle>
            <DialogDescription>
              This deletes the adapter and the recipe from your repository. Anything you changed in
              them goes with it, so check the diff first.
            </DialogDescription>

            <div className="mt-2 flex justify-end">
              <Button color="error">Remove</Button>
            </div>

            <DialogCloseTrigger aria-label="Close">
              <X />
            </DialogCloseTrigger>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </Dialog>
  );
}
