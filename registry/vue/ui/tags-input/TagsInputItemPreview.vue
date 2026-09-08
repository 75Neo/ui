<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputItemPreviewProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemPreviewProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemPreview :class="cn(styles.itemPreview(), props.class)">
    <slot />
  </Ark.ItemPreview>
</template>
