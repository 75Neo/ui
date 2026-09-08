<script setup lang="ts">
import { Star } from "@lucide/vue";
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItem,
  RatingGroupLabel,
} from "@/components/vue";

const colors = ["warning", "primary", "success", "error"] as const;
</script>

<template>
  <div class="flex flex-col gap-4">
    <RatingGroup v-for="color in colors" :key="color" :color="color" :default-value="4" :count="5">
      <RatingGroupLabel>{{ color }}</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItem v-for="index in [0, 1, 2, 3, 4]" :key="index" :index="index">
          <Star fill="currentColor" />
        </RatingGroupItem>
      </RatingGroupControl>
    </RatingGroup>
  </div>
</template>
