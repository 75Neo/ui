<script setup lang="ts">
import { Carousel } from "@75neo/vue/carousel";
import { carouselSchema } from "@75neo/themes";

const sizes = carouselSchema.size.values;

const items = [
  { id: "one", content: "Slide one" },
  { id: "two", content: "Slide two" },
  { id: "three", content: "Slide three" },
];

const stage =
  "[&_[data-slot=carousel-item]]:grid [&_[data-slot=carousel-item]]:h-28 [&_[data-slot=carousel-item]]:place-items-center";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-sm";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Carousel :size="size" :items="items" :class="stage" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>loop</p>
        <div :class="rowItems">
          <Carousel :items="items" loop :class="stage" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>two up</p>
        <div :class="rowItems">
          <Carousel :items="items" :slides-per-page="2" spacing="0.5rem" :class="stage" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>vertical</p>
        <div :class="rowItems">
          <Carousel :items="items" orientation="vertical" :class="`h-40 ${stage}`" />
        </div>
      </div>
    </div>
  </div>
</template>
