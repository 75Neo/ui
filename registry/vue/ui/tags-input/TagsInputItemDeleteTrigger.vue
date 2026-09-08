<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputItemDeleteTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemDeleteTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemDeleteTrigger :class="cn(styles.itemDeleteTrigger(), props.class)">
    <slot />
  </Ark.ItemDeleteTrigger>
</template>
