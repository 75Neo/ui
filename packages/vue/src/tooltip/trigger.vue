<script setup lang="ts">
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <!--
    Handed to Ark with `as-child`, so the trigger is the caller's own element rather
    than a button wrapping it. That element has to be focusable, or the tooltip is
    reachable by pointer only.
  -->
  <Ark.Trigger as-child>
    <slot />
  </Ark.Trigger>
</template>
