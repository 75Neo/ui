<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "@/components/vue";
</script>

<template>
  <Collapsible class="gap-3">
    <CollapsibleTrigger>
      What the CLI writes
      <CollapsibleIndicator>
        <ChevronDown />
      </CollapsibleIndicator>
    </CollapsibleTrigger>
    <CollapsibleContent>
      The adapter for your framework, the shared recipe it imports, and, the first time you add
      anything, the theme stylesheet at your project root.
    </CollapsibleContent>
  </Collapsible>
</template>
