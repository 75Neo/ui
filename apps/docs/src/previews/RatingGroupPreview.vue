<script setup lang="ts">
import { RatingGroup } from "@75neo/vue/rating-group";
</script>

<template>
  <div class="max-w-xs">
    <RatingGroup label="Quality" :default-value="3" />
  </div>
</template>
