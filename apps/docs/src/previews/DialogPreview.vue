<script setup lang="ts">
import { Dialog } from "@75neo/vue/dialog";
</script>

<template>
  <Dialog
    title="Delete project?"
    description="This cannot be undone."
    body="The project and its history leave the workspace for good."
    footer="Cancel"
  >
    <button type="button">Delete</button>
  </Dialog>
</template>
