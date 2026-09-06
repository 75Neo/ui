<script setup lang="ts">
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemText
    data-slot="tags-input-item-text"
    :class="cn('truncate', props.class as string | undefined)"
  >
    <slot />
  </Ark.ItemText>
</template>
