<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from "@/components/vue";

const sizes = ["sm", "md", "lg", "xl", "full"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Dialog v-for="size in sizes" :key="size">
      <DialogTrigger as-child>
        <Button variant="outline" size="sm">{{ size }}</Button>
      </DialogTrigger>

      <Teleport to="body">
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent :size="size">
            <DialogTitle>Size {{ size }}</DialogTitle>
            <DialogDescription>
              The positioner keeps the panel centred and the size only moves its maximum width.
            </DialogDescription>
          </DialogContent>
        </DialogPositioner>
      </Teleport>
    </Dialog>
  </div>
</template>
