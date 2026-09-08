<script setup lang="ts">
import { Star } from "@lucide/vue";
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupLabel,
} from "@/components/vue";
</script>

<template>
  <RatingGroup :default-value="4" :count="5">
    <RatingGroupLabel>How did the install go?</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItem v-for="index in [0, 1, 2, 3, 4]" :key="index" :index="index">
        <Star fill="currentColor" />
      </RatingGroupItem>
    </RatingGroupControl>
    <RatingGroupHiddenInput />
  </RatingGroup>
</template>
