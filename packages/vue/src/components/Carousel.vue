<script setup lang="ts">
import { computed } from "vue";
import {
  CarouselRoot as ArkRoot,
  CarouselItemGroup as ArkItemGroup,
  CarouselItem as ArkItem,
  CarouselIndicatorGroup as ArkIndicatorGroup,
  CarouselIndicator as ArkIndicator,
  CarouselPrevTrigger as ArkPrevTrigger,
  CarouselNextTrigger as ArkNextTrigger,
} from "@ark-ui/vue/carousel";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { twMerge } from "tailwind-merge";
import { carousel, type CarouselVariants } from "@75neo/styles";
import {
  applySlotClass,
  carouselKey,
  normalizeCarouselItems,
  type CarouselItemData,
  type CarouselUI,
} from "@75neo/core";
import { useComponentUI } from "../composables/useComponentUI";

type Item = CarouselItemData;

const props = withDefaults(
  defineProps<{
    items?: (Item | string | number)[];
    orientation?: CarouselVariants["orientation"];
    arrows?: boolean;
    dots?: boolean;
    defaultPage?: number;
    page?: number;
    loop?: boolean;
    autoplay?: boolean | { delay: number };
    spacing?: string;
    slidesPerPage?: number;
    slidesPerMove?: number | "auto";
    ui?: CarouselUI;
    class?: unknown;
  }>(),
  {
    items: undefined,
    orientation: undefined,
    arrows: false,
    dots: false,
    defaultPage: undefined,
    page: undefined,
    loop: false,
    autoplay: false,
    spacing: undefined,
    slidesPerPage: undefined,
    slidesPerMove: undefined,
    ui: undefined,
    class: undefined,
  },
);

const emit = defineEmits<{
  "update:page": [page: number];
  pageChange: [details: { page: number }];
  autoplayStatusChange: [details: { isPlaying: boolean }];
  dragStatusChange: [details: { isDragging: boolean }];
}>();

defineSlots<{
  /** Falls back to `item.content`. */
  item?: (bag: { item: Item; index: number }) => unknown;
  /** Falls back to a chevron. */
  prev?: () => unknown;
  /** Falls back to a chevron. */
  next?: () => unknown;
  /** Rendered when `items` is empty. */
  empty?: () => unknown;
}>();

const normalized = computed(() => normalizeCarouselItems(props.items));

const tvSlots = computed(() => carousel({ orientation: props.orientation }));

const resolved = useComponentUI(
  carouselKey,
  tvSlots,
  computed(() => props.ui),
);
</script>

<template>
  <ArkRoot
    :slide-count="normalized.length"
    :orientation="orientation"
    :default-page="defaultPage"
    :page="page"
    :loop="loop"
    :autoplay="autoplay"
    :spacing="spacing"
    :slides-per-page="slidesPerPage"
    :slides-per-move="slidesPerMove"
    data-slot="root"
    :class="resolved.root({ class: props.class as string })"
    @update:page="emit('update:page', $event)"
    @page-change="emit('pageChange', $event)"
    @autoplay-status-change="emit('autoplayStatusChange', $event)"
    @drag-status-change="emit('dragStatusChange', $event)"
  >
    <slot v-if="normalized.length === 0" name="empty" />
    <template v-else>
      <div data-slot="viewport" :class="resolved.viewport()">
        <ArkItemGroup data-slot="container" :class="resolved.container()">
          <ArkItem
            v-for="(item, index) in normalized"
            :key="index"
            :index="index"
            data-slot="item"
            :class="twMerge(applySlotClass(resolved.item(), item.ui?.item), item.class)"
          >
            <slot name="item" :item="item" :index="index">{{ item.content }}</slot>
          </ArkItem>
        </ArkItemGroup>
      </div>

      <div v-if="arrows || dots" data-slot="controls" :class="resolved.controls()">
        <div v-if="arrows" data-slot="arrows" :class="resolved.arrows()">
          <ArkPrevTrigger data-slot="prev" aria-label="Previous slide" :class="resolved.prev()">
            <slot name="prev"><ChevronLeft /></slot>
          </ArkPrevTrigger>
          <ArkNextTrigger data-slot="next" aria-label="Next slide" :class="resolved.next()">
            <slot name="next"><ChevronRight /></slot>
          </ArkNextTrigger>
        </div>

        <ArkIndicatorGroup v-if="dots" data-slot="dots" :class="resolved.dots()">
          <ArkIndicator
            v-for="(_, index) in normalized"
            :key="index"
            :index="index"
            data-slot="dot"
            :class="resolved.dot()"
          />
        </ArkIndicatorGroup>
      </div>
    </template>
  </ArkRoot>
</template>
