<script setup lang="ts">
import {
  Button,
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from "@/components/vue";
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
