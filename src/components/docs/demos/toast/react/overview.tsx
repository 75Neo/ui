import { createToaster } from "@ark-ui/react/toast";
import { X } from "lucide-react";
import {
  Button,
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  Toaster,
  ToastTitle,
} from "@/components/react";

const toaster = createToaster({ placement: "bottom-end", overlap: true, gap: 12 });

export default function ToastOverview() {
  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        onClick={() =>
          toaster.create({
            title: "Button installed",
            description: "Two files written to src/components/ui/button.",
          })
        }
      >
        Install the button
      </Button>

      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast>
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
            <ToastCloseTrigger aria-label="Dismiss">
              <X />
            </ToastCloseTrigger>
          </Toast>
        )}
      </Toaster>
    </div>
  );
}
