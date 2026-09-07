<script setup lang="ts">
import { Star } from "@lucide/vue";
import RatingGroup from "@/registry/vue/ui/rating-group/RatingGroup.vue";
import RatingGroupControl from "@/registry/vue/ui/rating-group/RatingGroupControl.vue";
import RatingGroupHiddenInput from "@/registry/vue/ui/rating-group/RatingGroupHiddenInput.vue";
import RatingGroupItem from "@/registry/vue/ui/rating-group/RatingGroupItem.vue";
import RatingGroupLabel from "@/registry/vue/ui/rating-group/RatingGroupLabel.vue";
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
