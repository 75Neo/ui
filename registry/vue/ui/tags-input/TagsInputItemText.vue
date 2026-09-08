<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputItemTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemTextProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemText :class="cn(styles.itemText(), props.class)">
    <slot />
  </Ark.ItemText>
</template>
