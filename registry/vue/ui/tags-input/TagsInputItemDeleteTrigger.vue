<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputItemDeleteTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemDeleteTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tagsInput();
</script>

<template>
  <Ark.ItemDeleteTrigger :class="cn(styles.itemDeleteTrigger(), props.class)">
    <slot />
  </Ark.ItemDeleteTrigger>
</template>
