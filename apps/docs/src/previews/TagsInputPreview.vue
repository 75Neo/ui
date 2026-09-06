<script setup lang="ts">
import { TagsInput } from "@75neo/vue/tags-input";
</script>

<template>
  <div class="max-w-xs">
    <TagsInput label="Tags" :default-value="['react', 'vue']" />
  </div>
</template>
