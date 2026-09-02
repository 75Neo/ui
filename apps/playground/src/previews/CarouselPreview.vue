<script setup lang="ts">
import { ref } from "vue";
import { carousel } from "@75neo/themes";
import { Carousel } from "@75neo/vue";
import type { CarouselItem } from "@75neo/themes";

const baseItems: CarouselItem[] = [
  { id: "1", content: "Slide 1 — The cascade, weakest first." },
  { id: "2", content: "Slide 2 — One word per slot." },
  { id: "3", content: "Slide 3 — Tokens flip, not classes." },
  { id: "4", content: "Slide 4 — Recipes describe themselves." },
  { id: "5", content: "Slide 5 — No per-component context." },
];

const row = "grid gap-2 @sm:grid-cols-[6rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
const rowItems = "min-w-0";
const group = "flex flex-col gap-6";
const rule = "border-muted my-6";
const slide =
  "flex h-32 items-center justify-center rounded-md bg-muted p-4 text-center text-sm font-medium text-default";
const slideWide =
  "flex h-32 w-[80%] shrink-0 items-center justify-center rounded-md bg-muted p-4 text-center text-sm font-medium text-default";

// keep ledger honest
void carousel;

const page = ref(0);
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>default</p>
        <div :class="rowItems">
          <Carousel :items="baseItems">
            <template #item="{ item }"
              ><div :class="slide">{{ item.content }}</div></template
            >
          </Carousel>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>loop</p>
        <div :class="rowItems">
          <Carousel :items="baseItems" loop>
            <template #item="{ item }"
              ><div :class="slide">{{ item.content }}</div></template
            >
          </Carousel>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>autoplay</p>
        <div :class="rowItems">
          <Carousel :items="baseItems" loop autoplay>
            <template #item="{ item }"
              ><div :class="slide">{{ item.content }}</div></template
            >
          </Carousel>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>slidesPerPage</p>
        <div :class="rowItems">
          <Carousel :items="baseItems" :slides-per-page="2" spacing="16px">
            <template #item="{ item }"
              ><div :class="slide">{{ item.content }}</div></template
            >
          </Carousel>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>spacing</p>
        <div :class="rowItems">
          <Carousel :items="baseItems" :slides-per-page="1.5" spacing="16px">
            <template #item="{ item }"
              ><div :class="slideWide">{{ item.content }}</div></template
            >
          </Carousel>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>vertical</p>
        <div :class="rowItems">
          <div class="h-64 overflow-hidden">
            <Carousel :items="baseItems.slice(0, 3)" orientation="vertical">
              <template #item="{ item }"
                ><div :class="slide">{{ item.content }}</div></template
              >
            </Carousel>
          </div>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>drag</p>
        <div :class="rowItems">
          <Carousel :items="baseItems" allow-mouse-drag>
            <template #item="{ item }"
              ><div :class="slide">{{ item.content }} — drag</div></template
            >
          </Carousel>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>render</p>
        <div :class="rowItems">
          <Carousel :items="baseItems.slice(0, 3)">
            <template #item="{ item, index }">
              <div
                class="flex h-32 flex-col items-center justify-center gap-1 rounded-md bg-primary p-4 text-center"
              >
                <span class="font-mono text-xs text-inverted" data-identifier
                  >{{ item.id }} · {{ index }}</span
                >
                <span class="text-sm font-semibold text-inverted">{{ item.content }}</span>
              </div>
            </template>
          </Carousel>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>controlled</p>
        <div :class="rowItems">
          <div class="flex flex-col gap-3">
            <Carousel v-model:page="page" :items="baseItems">
              <template #item="{ item }"
                ><div :class="slide">{{ item.content }}</div></template
              >
            </Carousel>
            <p class="font-mono text-xs text-toned" data-identifier>page {{ page }}</p>
          </div>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>ui</p>
        <div :class="rowItems">
          <Carousel :items="baseItems.slice(0, 3)" :ui="{ item: 'bg-primary text-inverted' }">
            <template #item="{ item }"
              ><div class="flex h-32 items-center justify-center p-4 text-sm">
                {{ item.content }}
              </div></template
            >
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</template>
