<script setup lang="ts">
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
  index: number;
  value: string;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item
    data-slot="tags-input-item"
    :class="cn('inline-flex min-w-0', props.class as string | undefined)"
    :index="props.index"
    :value="props.value"
  >
    <slot />
  </Ark.Item>
</template>
