<script setup lang="ts">
import { TagsInputContext } from "@ark-ui/vue/tags-input";
import {
  TagsInput,
  TagsInputControl,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputLabel,
} from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex max-w-md flex-col gap-5">
    <TagsInput v-for="size in sizes" :key="size" :size="size" :default-value="['button', 'table']">
      <TagsInputLabel>{{ size }}</TagsInputLabel>
      <TagsInputControl>
        <TagsInputContext v-slot="tags">
          <TagsInputItem
            v-for="(value, index) in tags.value"
            :key="value"
            :index="index"
            :value="value"
          >
            <TagsInputItemPreview>
              <TagsInputItemText>{{ value }}</TagsInputItemText>
            </TagsInputItemPreview>
          </TagsInputItem>
        </TagsInputContext>
        <TagsInputInput placeholder="Add an item" />
      </TagsInputControl>
    </TagsInput>
  </div>
</template>
