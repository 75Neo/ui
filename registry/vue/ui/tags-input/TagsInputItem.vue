<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputItemProps {
  index: number;
  value: string;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TagsInputItemProps>(), {
  disabled: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item
    :index="props.index"
    :value="props.value"
    :disabled="props.disabled"
    :class="cn(styles.item(), props.class)"
  >
    <slot />
  </Ark.Item>
</template>
