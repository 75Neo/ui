import preview from "../.storybook/preview";
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  Theme,
} from "@75neo/vue";
import { ref } from "vue";

const meta = preview.meta({
  title: "Carousel",
  component: Carousel,
});

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

export const Default = meta.story({
  render: () => ({
    components: { Carousel },
    setup() {
      const items = Array.from({ length: 5 }, (_, i) => ({ content: String(i + 1) }));
      return { items };
    },
    template: `
      <div class="w-full max-w-xl">
        <Carousel :items="items">
          <template #item="{ item }">
            <div class="flex h-48 items-center justify-center rounded-lg bg-muted text-2xl font-semibold">
              {{ item.content }}
            </div>
          </template>
        </Carousel>
      </div>
    `,
  }),
});

export const WithImages = meta.story({
  render: () => ({
    components: { Carousel },
    setup() {
      return { images };
    },
    template: `
      <div class="w-full max-w-xl">
        <Carousel :items="images">
          <template #item="{ item }">
            <img :src="item.src" :alt="item.alt" class="h-64 w-full rounded-lg object-cover" />
          </template>
        </Carousel>
      </div>
    `,
  }),
});

export const Controlled = meta.story({
  render: () => ({
    components: { Carousel },
    setup() {
      const page = ref(0);
      const items = Array.from({ length: 5 }, (_, i) => ({ content: String(i + 1) }));
      const onPageChange = (details: { page: number }) => {
        page.value = details.page;
      };
      const prev = () => {
        page.value = Math.max(0, page.value - 1);
      };
      const next = () => {
        page.value = Math.min(4, page.value + 1);
      };
      return { page, items, onPageChange, prev, next };
    },
    template: `
      <div class="flex w-full max-w-xl flex-col gap-4">
        <Carousel :items="items" :page="page" @page-change="onPageChange">
          <template #item="{ item }">
            <div class="flex h-48 items-center justify-center rounded-lg bg-muted text-2xl font-semibold">
              {{ item.content }}
            </div>
          </template>
        </Carousel>
        <div class="flex items-center justify-between text-sm text-muted">
          <span>Page: <span class="font-mono font-semibold text-default">{{ page + 1 }} / 5</span></span>
          <div class="flex gap-2">
            <button type="button" @click="prev" class="rounded bg-muted px-2 py-1 text-xs hover:bg-accented">Prev</button>
            <button type="button" @click="next" class="rounded bg-muted px-2 py-1 text-xs hover:bg-accented">Next</button>
          </div>
        </div>
      </div>
    `,
  }),
});

export const Autoplay = meta.story({
  render: () => ({
    components: { Carousel },
    setup() {
      return { images };
    },
    template: `
      <div class="w-full max-w-xl">
        <Carousel :items="images" autoplay loop>
          <template #item="{ item }">
            <img :src="item.src" :alt="item.alt" class="h-64 w-full rounded-lg object-cover" />
          </template>
        </Carousel>
        <p class="mt-2 text-xs text-muted">Autoplay with loop — advances every 4s.</p>
      </div>
    `,
  }),
});

export const Loop = meta.story({
  render: () => ({
    components: { Carousel },
    setup() {
      const items = Array.from({ length: 5 }, (_, i) => ({ content: String(i + 1) }));
      return { items };
    },
    template: `
      <div class="w-full max-w-xl">
        <Carousel :items="items" loop>
          <template #item="{ item }">
            <div class="flex h-48 items-center justify-center rounded-lg bg-muted text-2xl font-semibold">
              {{ item.content }}
            </div>
          </template>
        </Carousel>
        <p class="mt-2 text-xs text-muted">Loop enabled — navigation wraps around.</p>
      </div>
    `,
  }),
});

export const Vertical = meta.story({
  render: () => ({
    components: { Carousel },
    setup() {
      const items = Array.from({ length: 5 }, (_, i) => ({ content: String(i + 1) }));
      return { items };
    },
    template: `
      <div class="w-full max-w-xl">
        <Carousel orientation="vertical" :items="items">
          <template #item="{ item }">
            <div class="flex h-48 items-center justify-center rounded-lg bg-muted text-2xl font-semibold">
              {{ item.content }}
            </div>
          </template>
        </Carousel>
      </div>
    `,
  }),
});

export const SlidesPerPage = meta.story({
  render: () => ({
    components: { Carousel },
    setup() {
      const items = Array.from({ length: 6 }, (_, i) => ({ content: String(i + 1) }));
      return { items };
    },
    template: `
      <div class="w-full max-w-xl">
        <Carousel :slide-count="6" :slides-per-page="2" spacing="12px" :items="items">
          <template #item="{ item }">
            <div class="flex h-32 items-center justify-center rounded-lg bg-muted text-lg font-semibold">
              {{ item.content }}
            </div>
          </template>
        </Carousel>
        <p class="mt-2 text-xs text-muted">slidesPerPage=2 with 12px spacing.</p>
      </div>
    `,
  }),
});

export const Spacing = meta.story({
  render: () => ({
    components: { Carousel },
    setup() {
      const items = Array.from({ length: 6 }, (_, i) => ({ content: String(i + 1) }));
      return { items };
    },
    template: `
      <div class="w-full max-w-xl">
        <Carousel :slide-count="6" :slides-per-page="1.5" spacing="16px" :items="items">
          <template #item="{ item }">
            <div class="flex h-32 items-center justify-center rounded-lg bg-muted text-lg font-semibold">
              {{ item.content }}
            </div>
          </template>
        </Carousel>
        <p class="mt-2 text-xs text-muted">slidesPerPage=1.5 shows partial next slide.</p>
      </div>
    `,
  }),
});

export const Composition = meta.story({
  render: () => ({
    components: {
      Carousel,
      CarouselControl,
      CarouselPrevTrigger,
      CarouselNextTrigger,
      CarouselItemGroup,
      CarouselItem,
      CarouselIndicatorGroup,
      CarouselIndicator,
    },
    setup() {
      return { images };
    },
    template: `
      <div class="flex w-full max-w-xl flex-col gap-2">
        <Carousel :slide-count="images.length" class="gap-4">
          <CarouselControl>
            <CarouselPrevTrigger />
            <CarouselNextTrigger />
          </CarouselControl>
          <CarouselItemGroup>
            <CarouselItem v-for="(img, index) in images" :key="index" :index="index">
              <img :src="img.src" :alt="img.alt" class="h-64 w-full rounded-lg object-cover" />
            </CarouselItem>
          </CarouselItemGroup>
          <CarouselIndicatorGroup>
            <CarouselIndicator v-for="(_, index) in images" :key="index" :index="index" />
          </CarouselIndicatorGroup>
        </Carousel>
        <span class="text-xs text-muted">Built from primitives for full customization.</span>
      </div>
    `,
  }),
});

export const Themed = meta.story({
  render: () => ({
    components: { Carousel, Theme },
    setup() {
      const items = Array.from({ length: 3 }, (_, i) => ({ content: String(i + 1) }));
      const themedUi = {
        carousel: {
          indicator: "bg-primary/30 data-[current]:bg-primary h-2 w-6 rounded-full",
          prevTrigger: "bg-primary text-white hover:bg-primary/90 border-transparent",
          nextTrigger: "bg-primary text-white hover:bg-primary/90 border-transparent",
        },
      };
      return { items, themedUi };
    },
    template: `
      <div class="flex w-full max-w-xl flex-col gap-6">
        <Carousel :items="items">
          <template #item="{ item }">
            <div class="flex h-32 items-center justify-center rounded-lg bg-muted text-lg font-semibold">
              {{ item.content }}
            </div>
          </template>
        </Carousel>
        <Theme :ui="themedUi">
          <Carousel :items="items">
            <template #item="{ item }">
              <div class="flex h-32 items-center justify-center rounded-lg bg-muted text-lg font-semibold">
                {{ item.content }}
              </div>
            </template>
          </Carousel>
        </Theme>
        <p class="text-xs text-muted">
          Bottom carousel themed via <code>Theme</code> provider (custom indicators & triggers).
        </p>
      </div>
    `,
  }),
});
