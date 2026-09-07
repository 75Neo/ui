<script setup lang="ts">
import { X } from "@lucide/vue";
import Button from "@/registry/vue/ui/button/Button.vue";
import Drawer from "@/registry/vue/ui/drawer/Drawer.vue";
import DrawerBackdrop from "@/registry/vue/ui/drawer/DrawerBackdrop.vue";
import DrawerCloseTrigger from "@/registry/vue/ui/drawer/DrawerCloseTrigger.vue";
import DrawerContent from "@/registry/vue/ui/drawer/DrawerContent.vue";
import DrawerDescription from "@/registry/vue/ui/drawer/DrawerDescription.vue";
import DrawerPositioner from "@/registry/vue/ui/drawer/DrawerPositioner.vue";
import DrawerTitle from "@/registry/vue/ui/drawer/DrawerTitle.vue";
import DrawerTrigger from "@/registry/vue/ui/drawer/DrawerTrigger.vue";
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
