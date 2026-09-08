import { Portal } from "@ark-ui/react/portal";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from "@/components/react";

const sizes = ["sm", "md", "lg", "xl", "full"] as const;

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              {size}
            </Button>
          </DialogTrigger>

          <Portal>
            <DialogBackdrop />
            <DialogPositioner>
              <DialogContent size={size}>
                <DialogTitle>Size {size}</DialogTitle>
                <DialogDescription>
                  The positioner keeps the panel centred and the size only moves its maximum width.
                </DialogDescription>
              </DialogContent>
            </DialogPositioner>
          </Portal>
        </Dialog>
      ))}
    </div>
  );
}
