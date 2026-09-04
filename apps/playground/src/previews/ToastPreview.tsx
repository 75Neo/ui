import { createToaster, Button, Toast } from "@75neo/react";

const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
  gap: 16,
});

export default function ToastPreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        color="neutral"
        size="sm"
        onClick={() =>
          toaster.create({
            title: "Default toast",
            description: "A simple informative toast notification.",
          })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        color="success"
        size="sm"
        onClick={() =>
          toaster.create({
            title: "Changes saved",
            description: "Your preferences have been updated successfully.",
            type: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        color="error"
        size="sm"
        onClick={() =>
          toaster.create({
            title: "Upload failed",
            description: "Network error occurred while uploading file.",
            type: "error",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        color="warning"
        size="sm"
        onClick={() =>
          toaster.create({
            title: "Storage limit",
            description: "You have used 90% of your available storage.",
            type: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        color="info"
        size="sm"
        onClick={() =>
          toaster.create({
            title: "New update available",
            description: "A new version of the app is available for download.",
            type: "info",
          })
        }
      >
        Info
      </Button>
      <Toast toaster={toaster} />
    </div>
  );
}
