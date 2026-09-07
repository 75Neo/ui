<script setup lang="ts">
import { X } from "@lucide/vue";
import Button from "@/registry/vue/ui/button/Button.vue";
import Popover from "@/registry/vue/ui/popover/Popover.vue";
import PopoverArrow from "@/registry/vue/ui/popover/PopoverArrow.vue";
import PopoverArrowTip from "@/registry/vue/ui/popover/PopoverArrowTip.vue";
import PopoverCloseTrigger from "@/registry/vue/ui/popover/PopoverCloseTrigger.vue";
import PopoverContent from "@/registry/vue/ui/popover/PopoverContent.vue";
import PopoverDescription from "@/registry/vue/ui/popover/PopoverDescription.vue";
import PopoverPositioner from "@/registry/vue/ui/popover/PopoverPositioner.vue";
import PopoverTitle from "@/registry/vue/ui/popover/PopoverTitle.vue";
import PopoverTrigger from "@/registry/vue/ui/popover/PopoverTrigger.vue";
</script>

<template>
  <div class="flex justify-center py-4">
    <Popover :portalled="false">
      <PopoverTrigger as-child>
        <Button variant="outline">What is a recipe?</Button>
      </PopoverTrigger>

      <PopoverPositioner>
        <PopoverContent>
          <PopoverArrow>
            <PopoverArrowTip />
          </PopoverArrow>
          <PopoverTitle>The recipe</PopoverTitle>
          <PopoverDescription>
            One tailwind-variants call holding every class the component draws. Both adapters import
            it, so restyling happens in one file.
          </PopoverDescription>
          <PopoverCloseTrigger aria-label="Close">
            <X />
          </PopoverCloseTrigger>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  </div>
</template>
