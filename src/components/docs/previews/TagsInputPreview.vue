<script setup lang="ts">
import { X } from "@lucide/vue";
import TagsInput from "@/registry/vue/ui/tags-input/TagsInput.vue";
import TagsInputClearTrigger from "@/registry/vue/ui/tags-input/TagsInputClearTrigger.vue";
import TagsInputControl from "@/registry/vue/ui/tags-input/TagsInputControl.vue";
import TagsInputHiddenInput from "@/registry/vue/ui/tags-input/TagsInputHiddenInput.vue";
import TagsInputInput from "@/registry/vue/ui/tags-input/TagsInputInput.vue";
import TagsInputItem from "@/registry/vue/ui/tags-input/TagsInputItem.vue";
import TagsInputItemDeleteTrigger from "@/registry/vue/ui/tags-input/TagsInputItemDeleteTrigger.vue";
import TagsInputItemInput from "@/registry/vue/ui/tags-input/TagsInputItemInput.vue";
import TagsInputItemPreview from "@/registry/vue/ui/tags-input/TagsInputItemPreview.vue";
import TagsInputItemText from "@/registry/vue/ui/tags-input/TagsInputItemText.vue";
import { TagsInputContext } from "@ark-ui/vue/tags-input";
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
