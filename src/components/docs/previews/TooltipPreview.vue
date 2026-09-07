<script setup lang="ts">
import Button from "@/registry/vue/ui/button/Button.vue";
import Tooltip from "@/registry/vue/ui/tooltip/Tooltip.vue";
import TooltipArrow from "@/registry/vue/ui/tooltip/TooltipArrow.vue";
import TooltipArrowTip from "@/registry/vue/ui/tooltip/TooltipArrowTip.vue";
import TooltipContent from "@/registry/vue/ui/tooltip/TooltipContent.vue";
import TooltipPositioner from "@/registry/vue/ui/tooltip/TooltipPositioner.vue";
import TooltipTrigger from "@/registry/vue/ui/tooltip/TooltipTrigger.vue";
</script>

<template>
  <div class="flex justify-center py-6">
    <Tooltip :open-delay="200">
      <TooltipTrigger as-child>
        <Button variant="outline">Hover or focus me</Button>
      </TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent>
          <TooltipArrow>
            <TooltipArrowTip />
          </TooltipArrow>
          Overwrites the file on the next install
        </TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  </div>
</template>
