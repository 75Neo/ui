<script setup lang="ts">
import type { Component } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { type CarouselItem, type CarouselProps, carousel } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The page lives outside the shared contract: Vue spells a controlled page
 * `v-model:page` (or `page` + `update:page`), React spells it `page` /
 * `onPageChange`. `defaultPage` is the uncontrolled counterpart Ark's root
 * already takes.
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
    <Ark.Control data-slot="control" :class="theme.class.control">
      <Ark.PrevTrigger data-slot="prevTrigger" :class="theme.class.prevTrigger">
        <component :is="props.prevIcon ?? ChevronLeft" />
      </Ark.PrevTrigger>
      <Ark.ItemGroup data-slot="itemGroup" :class="theme.class.itemGroup">
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
      <Ark.NextTrigger data-slot="nextTrigger" :class="theme.class.nextTrigger">
        <component :is="props.nextIcon ?? ChevronRight" />
      </Ark.NextTrigger>
    </Ark.Control>
    <Ark.IndicatorGroup data-slot="indicatorGroup" :class="theme.class.indicatorGroup">
      <Ark.Indicator
        v-for="(_, index) in props.items"
        :key="index"
        :index="index"
        data-slot="indicator"
        :class="theme.class.indicator"
      />
    </Ark.IndicatorGroup>
  </Ark.Root>
</template>
