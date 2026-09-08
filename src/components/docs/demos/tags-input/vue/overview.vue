<script setup lang="ts">
import { TagsInputContext } from "@ark-ui/vue/tags-input";
import { X } from "@lucide/vue";
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemText,
} from "@/components/vue";
</script>

<template>
  <div class="max-w-md">
    <TagsInput editable :default-value="['button', 'table', 'toc']">
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
              <TagsInputItemDeleteTrigger aria-label="Remove">
                <X />
              </TagsInputItemDeleteTrigger>
            </TagsInputItemPreview>
            <TagsInputItemInput />
          </TagsInputItem>
        </TagsInputContext>

        <TagsInputInput placeholder="Add an item" />
        <TagsInputClearTrigger aria-label="Clear">
          <X />
        </TagsInputClearTrigger>
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  </div>
</template>
