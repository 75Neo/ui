<script setup lang="ts">
import { Check, Copy } from "@lucide/vue";
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from "@/components/vue";
</script>

<template>
  <div class="max-w-md">
    <Clipboard default-value="npx @75neo/ui@latest add button">
      <ClipboardLabel>Install command</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput />
        <ClipboardTrigger>
          <ClipboardIndicator>
            <Copy />
            <template #copied>
              <Check />
            </template>
          </ClipboardIndicator>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  </div>
</template>
