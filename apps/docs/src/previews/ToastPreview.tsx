import { Toaster, createToaster } from "@75neo/react/toast";

const toaster = createToaster({ placement: "bottom-end" });

export function ToastPreview() {
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          toaster.create({
            title: "Scheduled for tomorrow",
            description: "Your meeting is at 10am.",
            type: "info",
          })
        }
      >
        Schedule meeting
      </button>
      <Toaster toaster={toaster} />
    </div>
  );
}
