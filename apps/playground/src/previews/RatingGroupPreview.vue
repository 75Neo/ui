<script setup lang="ts">
import { ref } from "vue";
import { Heart } from "@lucide/vue";
import { ratingGroup, variantValues } from "@75neo/themes";
import { RatingGroup } from "@75neo/vue";

const sizes = variantValues(ratingGroup, "size");
const colors = variantValues(ratingGroup, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const score = ref(3);
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <RatingGroup :size="size" :default-value="3" />
    </div>

    <hr class="border-muted" />

    <!--
      The accent fills a star. Amber is the default, because a reader knows what an amber
      star means before reading a word.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <RatingGroup :color="accent" size="sm" :default-value="4" />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <!-- A half star is the same shape cut down the middle, not a second icon. -->
      <RatingGroup label="Half stars" allow-half :default-value="3.5" />
      <RatingGroup label="Ten of them" :count="10" :default-value="7" />
      <RatingGroup label="Hearts" :icon="Heart" color="error" :default-value="4" />
      <RatingGroup label="Read only" read-only :default-value="4" allow-half />
      <RatingGroup label="Disabled" disabled :default-value="2" />
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-center gap-4">
      <RatingGroup v-model="score" label="Controlled" allow-half />
      <output class="font-mono text-sm text-toned">{{ score }}</output>
    </div>
  </div>
</template>
