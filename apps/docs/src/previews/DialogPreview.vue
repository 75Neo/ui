<script setup lang="ts">
import { Button, Dialog } from "@75neo/vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Dialog title="Delete this project?" description="This cannot be undone.">
      <Button variant="outline" color="neutral">Open a dialog</Button>

      <template #body>
        <p>
          Deleting it removes every theme and adapter built from it. Members keep their accounts.
        </p>
      </template>

      <template #footer>
        <Button variant="ghost" color="neutral" size="sm">Cancel</Button>
        <Button color="error" size="sm">Delete</Button>
      </template>
    </Dialog>

    <Dialog
      size="lg"
      role="alertdialog"
      :dismissible="false"
      title="Your session is about to expire"
      description="Escape and a click outside do nothing here."
    >
      <Button variant="outline" color="neutral">Not dismissible</Button>

      <template #body>
        <p>You will be signed out in two minutes unless you carry on.</p>
      </template>

      <template #footer>
        <Button color="warning" size="sm">Stay signed in</Button>
      </template>
    </Dialog>
  </div>
</template>
