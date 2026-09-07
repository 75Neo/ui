<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputInputProps>();

const styles = tagsInput();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
