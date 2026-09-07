<script setup lang="ts">
import { X } from "@lucide/vue";
import Button from "@/registry/vue/ui/button/Button.vue";
import Dialog from "@/registry/vue/ui/dialog/Dialog.vue";
import DialogBackdrop from "@/registry/vue/ui/dialog/DialogBackdrop.vue";
import DialogCloseTrigger from "@/registry/vue/ui/dialog/DialogCloseTrigger.vue";
import DialogContent from "@/registry/vue/ui/dialog/DialogContent.vue";
import DialogDescription from "@/registry/vue/ui/dialog/DialogDescription.vue";
import DialogPositioner from "@/registry/vue/ui/dialog/DialogPositioner.vue";
import DialogTitle from "@/registry/vue/ui/dialog/DialogTitle.vue";
import DialogTrigger from "@/registry/vue/ui/dialog/DialogTrigger.vue";
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

          <div class="mt-2 flex justify-end gap-2">
            <DialogCloseTrigger as-child>
              <Button variant="ghost" color="secondary">Keep it</Button>
            </DialogCloseTrigger>
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
