<script setup lang="ts">
import { ref } from "vue";
import { Carousel, Theme } from "@75neo/vue";
import { ChevronsLeft, ChevronsRight } from "@lucide/vue";

const basicItems = Array.from({ length: 5 }, (_, i) => ({ content: String(i + 1) }));
const themedItems = Array.from({ length: 3 }, (_, i) => ({ content: String(i + 1) }));

const images = [
  { src: "https://nstcrystal.is-a.dev/images/Thirty_seven_1.png", alt: "nstcrystal" },
  { src: "https://nstcrystal.is-a.dev/images/Voyager.png", alt: "2giosangmitom" },
  { src: "https://nstcrystal.is-a.dev/images/Thirty_seven_2.png", alt: "nstcrystal" },
  { src: "https://nstcrystal.is-a.dev/images/Cosmic_overture.png", alt: "2giosangmitom" },
  {
    src: "https://nstcrystal.is-a.dev/_vercel/image?url=%2Fimages%2Freverse1999.png&w=1536&q=100",
    alt: "nstcrystal",
  },
];
const imageItems = images.map((image) => ({ content: image.alt }));

const themedUi = {
  carousel: {
    dot: "bg-primary/30 data-[state=active]:bg-primary h-2 w-6 rounded-full",
    prev: "bg-primary text-white hover:bg-primary/90 border-transparent",
    next: "bg-primary text-white hover:bg-primary/90 border-transparent",
  },
};

// `<script setup>` runs once per story, so this ref is not shared between them.
const page = ref(0);
</script>

<template>
  <Stories title="Carousel" :component="Carousel">
    <Story title="Default">
      <div class="w-full max-w-xl">
        <Carousel :items="basicItems">
          <template #item="{ item }">
            <div
              class="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold"
            >
              {{ item.content }}
            </div>
          </template>
        </Carousel>
        <p class="text-muted mt-2 text-xs">
          Swipe or drag — use <code>arrows</code>/<code>dots</code>
        </p>
      </div>
    </Story>

    <Story title="With Arrows">
      <div class="w-full max-w-xl">
        <Carousel arrows :items="basicItems">
          <template #item="{ item }">
            <div
              class="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold"
            >
              {{ item.content }}
            </div>
          </template>
        </Carousel>
      </div>
    </Story>

    <Story title="With Dots">
      <div class="w-full max-w-xl pb-8">
        <Carousel dots :items="basicItems">
          <template #item="{ item }">
            <div
              class="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold"
            >
              {{ item.content }}
            </div>
          </template>
        </Carousel>
      </div>
    </Story>

    <Story title="With Images">
      <div class="w-full max-w-xl">
        <Carousel :items="imageItems">
          <template #item="{ index }">
            <img
              :src="images[index].src"
              :alt="images[index].alt"
              class="h-64 w-full rounded-lg object-cover"
            />
          </template>
        </Carousel>
      </div>
    </Story>

    <Story title="Controlled">
      <div class="flex w-full max-w-xl flex-col gap-4">
        <Carousel :items="basicItems" :page="page" @page-change="page = $event.page">
          <template #item="{ item }">
            <div
              class="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold"
            >
              {{ item.content }}
            </div>
          </template>
        </Carousel>
        <div class="text-muted flex items-center justify-between text-sm">
          <span>
            Page: <span class="text-default font-mono font-semibold">{{ page + 1 }} / 5</span>
          </span>
          <div class="flex gap-2">
            <button
              type="button"
              class="bg-muted hover:bg-accented rounded px-2 py-1 text-xs"
              @click="page = Math.max(0, page - 1)"
            >
              Prev
            </button>
            <button
              type="button"
              class="bg-muted hover:bg-accented rounded px-2 py-1 text-xs"
              @click="page = Math.min(4, page + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Story>

    <Story title="Vertical">
      <div class="w-full max-w-xl">
        <Carousel orientation="vertical" :items="basicItems">
          <template #item="{ item }">
            <div
              class="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold"
            >
              {{ item.content }}
            </div>
          </template>
        </Carousel>
      </div>
    </Story>

    <Story title="Slots">
      <div class="w-full max-w-xl">
        <Carousel arrows dots :items="[1, 2, 3, 4, 5]">
          <template #item="{ item, index }">
            <div
              class="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold"
            >
              {{ item.content }} · slide {{ index + 1 }}
            </div>
          </template>
          <template #prev><ChevronsLeft /></template>
          <template #next><ChevronsRight /></template>
        </Carousel>
        <p class="text-muted mt-2 text-xs">
          <code>#item</code>, <code>#prev</code> and <code>#next</code> slots —
          <code>#item</code> receives <code>{ item, index }</code>
        </p>
      </div>
    </Story>

    <Story title="Themed">
      <div class="flex w-full max-w-xl flex-col gap-6 pb-8">
        <Carousel arrows dots :items="themedItems">
          <template #item="{ item }">
            <div
              class="bg-muted flex h-32 items-center justify-center rounded-lg text-lg font-semibold"
            >
              {{ item.content }}
            </div>
          </template>
        </Carousel>
        <Theme :ui="themedUi">
          <Carousel arrows dots :items="themedItems" :ui="{ item: 'basis-1/2' }">
            <template #item="{ item }">
              <div
                class="bg-muted flex h-32 items-center justify-center rounded-lg text-lg font-semibold"
              >
                {{ item.content }}
              </div>
            </template>
          </Carousel>
        </Theme>
      </div>
    </Story>
  </Stories>
</template>
