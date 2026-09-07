<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputItemInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemInputProps>();

const styles = tagsInput();
</script>

<template>
  <Ark.ItemInput :class="cn(styles.itemInput(), props.class)" />
</template>
