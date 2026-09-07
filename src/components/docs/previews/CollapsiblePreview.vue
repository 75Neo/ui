<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import Collapsible from "@/registry/vue/ui/collapsible/Collapsible.vue";
import CollapsibleContent from "@/registry/vue/ui/collapsible/CollapsibleContent.vue";
import CollapsibleIndicator from "@/registry/vue/ui/collapsible/CollapsibleIndicator.vue";
import CollapsibleTrigger from "@/registry/vue/ui/collapsible/CollapsibleTrigger.vue";
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
