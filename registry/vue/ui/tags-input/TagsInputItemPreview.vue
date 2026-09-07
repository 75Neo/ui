<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputItemPreviewProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemPreviewProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tagsInput();
</script>

<template>
  <Ark.ItemPreview :class="cn(styles.itemPreview(), props.class)">
    <slot />
  </Ark.ItemPreview>
</template>
