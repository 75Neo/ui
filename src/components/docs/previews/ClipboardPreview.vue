<script setup lang="ts">
import { Check, Copy } from "@lucide/vue";
import Clipboard from "@/registry/vue/ui/clipboard/Clipboard.vue";
import ClipboardControl from "@/registry/vue/ui/clipboard/ClipboardControl.vue";
import ClipboardIndicator from "@/registry/vue/ui/clipboard/ClipboardIndicator.vue";
import ClipboardInput from "@/registry/vue/ui/clipboard/ClipboardInput.vue";
import ClipboardLabel from "@/registry/vue/ui/clipboard/ClipboardLabel.vue";
import ClipboardTrigger from "@/registry/vue/ui/clipboard/ClipboardTrigger.vue";
</script>

<template>
  <div class="max-w-md">
    <Clipboard default-value="npx shadcn-vue@latest add @75neo/button">
      <ClipboardLabel>Install command</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput />
        <ClipboardTrigger>
          <ClipboardIndicator>
            <template #fallback>
              <Copy />
            </template>
            <Check />
          </ClipboardIndicator>
          Copy
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  </div>
</template>
