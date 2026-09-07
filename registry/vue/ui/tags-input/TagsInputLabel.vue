<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tagsInput();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
