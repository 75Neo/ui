<script setup lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@75neo/vue/collapsible";
</script>

<template>
  <Collapsible class="w-full max-w-sm" :default-open="true">
    <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
    <CollapsibleContent>
      A named value for a design decision, so the decision is made once and spent everywhere.
    </CollapsibleContent>
  </Collapsible>
</template>
