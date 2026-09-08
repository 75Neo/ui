<script setup lang="ts">
import { X } from "@lucide/vue";
import {
  Button,
  Drawer,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/vue";
</script>

<template>
  <Drawer swipe-direction="end">
    <DrawerTrigger as-child>
      <Button variant="outline">Open the registry panel</Button>
    </DrawerTrigger>

    <Teleport to="body">
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Registry</DrawerTitle>
          <DrawerDescription>
            Every item the CLI can install, and the files each one writes into your repository.
          </DrawerDescription>

          <DrawerCloseTrigger aria-label="Close">
            <X />
          </DrawerCloseTrigger>
        </DrawerContent>
      </DrawerPositioner>
    </Teleport>
  </Drawer>
</template>
