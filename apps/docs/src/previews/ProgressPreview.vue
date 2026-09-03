<script setup lang="ts">
import { Progress } from "@75neo/vue";
</script>

<template>
  <div class="flex flex-col gap-6">
    <Progress label="Uploading" show-value :default-value="45" />
    <Progress label="Working" :model-value="null" color="secondary" />
    <Progress size="lg" color="success" :default-value="100" />
  </div>
</template>
