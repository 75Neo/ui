<script setup lang="ts">
import type { Component } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { type CarouselItem, type CarouselProps, carousel } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The current page lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:page`, with
 * `defaultPage` as the uncontrolled counterpart Ark's root already takes.
 */
const props = defineProps<
  CarouselProps<Component> & {
    defaultPage?: number;
    class?: unknown;
  }
>();

const page = defineModel<number>("page");

defineSlots<{
  /** Replace a slide's content. Falls back to `item.content`. */
  item?: (props: { item: CarouselItem; index: number }) => unknown;
}>();

const theme = useResolvedTheme(
  carousel,
  "carousel",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:page="page"
    data-slot="base"
    :class="theme.class.base"
    :slide-count="props.items.length"
    :orientation="props.orientation"
    :loop="props.loop"
    :autoplay="props.autoplay"
    :slides-per-page="props.slidesPerPage"
    :spacing="props.spacing"
    :allow-mouse-drag="props.allowMouseDrag"
    :default-page="props.defaultPage"
  >
    <Ark.Control data-slot="controls" :class="theme.class.controls">
      <Ark.PrevTrigger data-slot="prev" :class="theme.class.prev">
        <component :is="props.prevIcon ?? ChevronLeft" />
      </Ark.PrevTrigger>
      <Ark.ItemGroup data-slot="viewport" :class="theme.class.viewport">
        <Ark.Item
          v-for="(item, index) in props.items"
          :key="item.id"
          :index="index"
          data-slot="item"
          :class="theme.class.item"
        >
          <slot name="item" :item="item" :index="index">{{ item.content }}</slot>
        </Ark.Item>
      </Ark.ItemGroup>
      <Ark.NextTrigger data-slot="next" :class="theme.class.next">
        <component :is="props.nextIcon ?? ChevronRight" />
      </Ark.NextTrigger>
    </Ark.Control>
    <Ark.IndicatorGroup data-slot="dots" :class="theme.class.dots">
      <Ark.Indicator
        v-for="(_, index) in props.items"
        :key="index"
        :index="index"
        data-slot="dot"
        :class="theme.class.dot"
      />
    </Ark.IndicatorGroup>
  </Ark.Root>
</template>
