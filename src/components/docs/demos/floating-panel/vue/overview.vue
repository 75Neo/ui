<script setup lang="ts">
import { Maximize2, Minus, X } from "@lucide/vue";
import {
  Button,
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelControl,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from "@/components/vue";
</script>

<template>
  <div class="flex justify-center">
    <FloatingPanel :default-size="{ width: 300, height: 200 }">
      <FloatingPanelTrigger as-child>
        <Button variant="outline">Open the inspector</Button>
      </FloatingPanelTrigger>

      <Teleport to="body">
        <FloatingPanelPositioner>
          <FloatingPanelContent>
            <FloatingPanelHeader>
              <FloatingPanelDragTrigger>
                <FloatingPanelTitle>Inspector</FloatingPanelTitle>
              </FloatingPanelDragTrigger>
              <FloatingPanelControl>
                <FloatingPanelStageTrigger stage="minimized" aria-label="Minimise">
                  <Minus />
                </FloatingPanelStageTrigger>
                <FloatingPanelStageTrigger stage="maximized" aria-label="Maximise">
                  <Maximize2 />
                </FloatingPanelStageTrigger>
                <FloatingPanelCloseTrigger aria-label="Close">
                  <X />
                </FloatingPanelCloseTrigger>
              </FloatingPanelControl>
            </FloatingPanelHeader>
            <FloatingPanelBody>
              Drag the header to move this, and the edges to resize it.
            </FloatingPanelBody>
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </Teleport>
    </FloatingPanel>
  </div>
</template>
