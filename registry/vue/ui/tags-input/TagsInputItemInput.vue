<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputItemInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemInputProps>();
</script>

<template>
  <Ark.ItemInput :class="cn(styles.itemInput(), props.class)" />
</template>
