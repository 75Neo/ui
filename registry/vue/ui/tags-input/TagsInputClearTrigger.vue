<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputClearTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputClearTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tagsInput();
</script>

<template>
  <Ark.ClearTrigger :class="cn(styles.clearTrigger(), props.class)">
    <slot />
  </Ark.ClearTrigger>
</template>
