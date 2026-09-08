<script setup lang="ts">
import {
  Button,
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerDescription,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/vue";

const sizes = ["sm", "md", "lg", "xl", "full"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Drawer v-for="size in sizes" :key="size" swipe-direction="end">
      <DrawerTrigger as-child>
        <Button variant="outline" size="sm">{{ size }}</Button>
      </DrawerTrigger>

      <Teleport to="body">
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent :size="size">
            <DrawerTitle>Size {{ size }}</DrawerTitle>
            <DrawerDescription>
              Width only applies to the left and right placements.
            </DrawerDescription>
          </DrawerContent>
        </DrawerPositioner>
      </Teleport>
    </Drawer>
  </div>
</template>
