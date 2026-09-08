<script setup lang="ts">
import { X } from "@lucide/vue";
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
} from "@/components/vue";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Remove the button</Button>
    </DialogTrigger>

    <Teleport to="body">
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Remove the button?</DialogTitle>
          <DialogDescription>
            This deletes the adapter and the recipe from your repository. Anything you changed in
            them goes with it, so check the diff first.
          </DialogDescription>

          <div class="mt-2 flex justify-end">
            <Button color="error">Remove</Button>
          </div>

          <DialogCloseTrigger aria-label="Close">
            <X />
          </DialogCloseTrigger>
        </DialogContent>
      </DialogPositioner>
    </Teleport>
  </Dialog>
</template>
