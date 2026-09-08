<script setup lang="ts">
import Splitter from "@/registry/vue/ui/splitter/Splitter.vue";
import SplitterPanel from "@/registry/vue/ui/splitter/SplitterPanel.vue";
import SplitterResizeTrigger from "@/registry/vue/ui/splitter/SplitterResizeTrigger.vue";
import SplitterResizeTriggerIndicator from "@/registry/vue/ui/splitter/SplitterResizeTriggerIndicator.vue";
</script>

<template>
  <Splitter
    class="h-48 rounded-md ring ring-default"
    :panels="[{ id: 'source' }, { id: 'preview' }]"
    :default-size="[40, 60]"
  >
    <SplitterPanel id="source" class="p-4 text-sm text-muted">
      The adapter and the recipe, as the CLI wrote them.
    </SplitterPanel>
    <SplitterResizeTrigger id="source:preview">
      <SplitterResizeTriggerIndicator />
    </SplitterResizeTrigger>
    <SplitterPanel id="preview" class="p-4 text-sm text-muted">
      The component, rendered with the tokens from your own stylesheet.
    </SplitterPanel>
  </Splitter>
</template>
