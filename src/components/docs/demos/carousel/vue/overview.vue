<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from "@/components/vue";

const slides = ["accordion", "dialog", "table", "tabs"];
</script>

<template>
  <Carousel :slide-count="slides.length" spacing="12px" loop class="max-w-lg">
    <CarouselItemGroup>
      <CarouselItem v-for="(slide, index) in slides" :key="slide" :index="index">
        <div
          class="flex h-32 items-center justify-center rounded-md bg-muted/60 font-mono text-sm text-muted"
        >
          {{ slide }}
        </div>
      </CarouselItem>
    </CarouselItemGroup>

    <CarouselControl>
      <CarouselPrevTrigger aria-label="Previous slide">
        <ChevronLeft />
      </CarouselPrevTrigger>
      <CarouselIndicatorGroup>
        <CarouselIndicator
          v-for="(slide, index) in slides"
          :key="slide"
          :index="index"
          :aria-label="`Go to ${slide}`"
        />
      </CarouselIndicatorGroup>
      <CarouselNextTrigger aria-label="Next slide">
        <ChevronRight />
      </CarouselNextTrigger>
    </CarouselControl>
  </Carousel>
</template>
