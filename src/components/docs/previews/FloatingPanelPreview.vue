<script setup lang="ts">
import { Maximize2, Minus, X } from "@lucide/vue";
import Button from "@/registry/vue/ui/button/Button.vue";
import FloatingPanel from "@/registry/vue/ui/floating-panel/FloatingPanel.vue";
import FloatingPanelBody from "@/registry/vue/ui/floating-panel/FloatingPanelBody.vue";
import FloatingPanelCloseTrigger from "@/registry/vue/ui/floating-panel/FloatingPanelCloseTrigger.vue";
import FloatingPanelContent from "@/registry/vue/ui/floating-panel/FloatingPanelContent.vue";
import FloatingPanelControl from "@/registry/vue/ui/floating-panel/FloatingPanelControl.vue";
import FloatingPanelDragTrigger from "@/registry/vue/ui/floating-panel/FloatingPanelDragTrigger.vue";
import FloatingPanelHeader from "@/registry/vue/ui/floating-panel/FloatingPanelHeader.vue";
import FloatingPanelPositioner from "@/registry/vue/ui/floating-panel/FloatingPanelPositioner.vue";
import FloatingPanelStageTrigger from "@/registry/vue/ui/floating-panel/FloatingPanelStageTrigger.vue";
import FloatingPanelTitle from "@/registry/vue/ui/floating-panel/FloatingPanelTitle.vue";
import FloatingPanelTrigger from "@/registry/vue/ui/floating-panel/FloatingPanelTrigger.vue";
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
