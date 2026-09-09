<script setup lang="ts">
import { Check, Copy } from "@lucide/vue";
import Clipboard from "@/registry/vue/ui/clipboard/Clipboard.vue";
import ClipboardIndicator from "@/registry/vue/ui/clipboard/ClipboardIndicator.vue";
import ClipboardTrigger from "@/registry/vue/ui/clipboard/ClipboardTrigger.vue";

interface CodeCopyProps {
  value: string;
}

const props = defineProps<CodeCopyProps>();
</script>

<template>
  <Clipboard :default-value="props.value" class="w-auto">
    <ClipboardTrigger class="size-8 bg-elevated">
      <ClipboardIndicator>
        <Copy />
        <template #copied>
          <Check />
        </template>
      </ClipboardIndicator>
    </ClipboardTrigger>
  </Clipboard>
</template>
