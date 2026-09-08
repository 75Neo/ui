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
