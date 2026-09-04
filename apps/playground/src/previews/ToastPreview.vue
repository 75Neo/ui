<script setup lang="ts">
import { createToaster, Button, Toast } from "@75neo/vue";

const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
  gap: 16,
});

function showToast(type?: "success" | "error" | "warning" | "info") {
  switch (type) {
    case "success":
      toaster.create({
        title: "Changes saved",
        description: "Your preferences have been updated successfully.",
        type: "success",
      });
      break;
    case "error":
      toaster.create({
        title: "Upload failed",
        description: "Network error occurred while uploading file.",
        type: "error",
      });
      break;
    case "warning":
      toaster.create({
        title: "Storage limit",
        description: "You have used 90% of your available storage.",
        type: "warning",
      });
      break;
    case "info":
      toaster.create({
        title: "New update available",
        description: "A new version of the app is available for download.",
        type: "info",
      });
      break;
    default:
      toaster.create({
        title: "Default toast",
        description: "A simple informative toast notification.",
      });
      break;
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <Button variant="outline" color="neutral" size="sm" @click="showToast()"> Default </Button>
    <Button variant="outline" color="success" size="sm" @click="showToast('success')">
      Success
    </Button>
    <Button variant="outline" color="error" size="sm" @click="showToast('error')"> Error </Button>
    <Button variant="outline" color="warning" size="sm" @click="showToast('warning')">
      Warning
    </Button>
    <Button variant="outline" color="info" size="sm" @click="showToast('info')"> Info </Button>
    <Toast :toaster="toaster" />
  </div>
</template>
