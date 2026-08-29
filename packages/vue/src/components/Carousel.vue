<script lang="ts">
// oxlint-disable typescript/no-explicit-any
import { computed as computedPrimitive, defineComponent, h, type PropType } from "vue";
import {
  CarouselRoot as ArkRootPrimitive,
  CarouselControl as ArkControlPrimitive,
  CarouselItemGroup as ArkItemGroupPrimitive,
  CarouselItem as ArkItemPrimitive,
  CarouselIndicatorGroup as ArkIndicatorGroupPrimitive,
  CarouselIndicator as ArkIndicatorPrimitive,
  CarouselPrevTrigger as ArkPrevTriggerPrimitive,
  CarouselNextTrigger as ArkNextTriggerPrimitive,
} from "@ark-ui/vue/carousel";
import {
  carousel as carouselPrimitive,
  type CarouselVariants as CarouselVariantsPrimitive,
  type SlotClass as SlotClassPrimitive,
} from "@75neo/styles";
import { useComponentUI as useComponentUIPrimitive } from "../composables/useComponentUI";
import {
  ChevronLeft as ChevronLeftPrimitive,
  ChevronRight as ChevronRightPrimitive,
} from "@lucide/vue";

export type CarouselUI = {
  root?: string | ((cls: string) => string);
  control?: string | ((cls: string) => string);
  itemGroup?: string | ((cls: string) => string);
  item?: string | ((cls: string) => string);
  indicatorGroup?: string | ((cls: string) => string);
  indicator?: string | ((cls: string) => string);
  prevTrigger?: string | ((cls: string) => string);
  nextTrigger?: string | ((cls: string) => string);
  autoplayTrigger?: string | ((cls: string) => string);
  autoplayIndicator?: string | ((cls: string) => string);
  progressText?: string | ((cls: string) => string);
};

export interface CarouselItem {
  content?: string;
  ui?: {
    item?: string | ((cls: string) => string);
    indicator?: string | ((cls: string) => string);
  };
}

export const CarouselRoot = defineComponent({
  name: "CarouselRoot",
  inheritAttrs: false,
  props: {
    slideCount: { type: Number as PropType<number>, required: false, default: undefined },
    orientation: {
      type: String as PropType<CarouselVariantsPrimitive["orientation"]>,
      required: false,
      default: undefined,
    },
    defaultPage: { type: Number as PropType<number>, required: false, default: undefined },
    page: { type: Number as PropType<number>, required: false, default: undefined },
    loop: { type: Boolean, required: false, default: false },
    autoplay: {
      type: [Boolean, Object] as PropType<boolean | { delay: number }>,
      required: false,
      default: false,
    },
    spacing: { type: String as PropType<string>, required: false, default: undefined },
    slidesPerPage: { type: Number as PropType<number>, required: false, default: undefined },
    slidesPerMove: {
      type: [Number, String] as PropType<number | "auto">,
      required: false,
      default: undefined,
    },
    ui: { type: Object as PropType<CarouselUI>, required: false, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const tvSlots = computedPrimitive(() => carouselPrimitive({ orientation: props.orientation }));
    const resolved = useComponentUIPrimitive(
      "carousel",
      tvSlots,
      computedPrimitive(() => props.ui as Record<string, SlotClassPrimitive> | undefined),
    );
    return () =>
      h(
        ArkRootPrimitive as any,
        {
          "data-slot": "root",
          class: resolved.value.root(),
          "slide-count": props.slideCount ?? (attrs["slide-count"] as number) ?? 0,
          orientation: props.orientation,
          "default-page": props.defaultPage,
          page: props.page,
          loop: props.loop,
          autoplay: props.autoplay,
          spacing: props.spacing,
          "slides-per-page": props.slidesPerPage,
          "slides-per-move": props.slidesPerMove,
          ...attrs,
        },
        slots,
      );
  },
});

export const CarouselControl = defineComponent({
  name: "CarouselControl",
  inheritAttrs: false,
  props: {
    ui: { type: Object as PropType<CarouselUI>, required: false, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const tvSlots = computedPrimitive(() => carouselPrimitive({}));
    const resolved = useComponentUIPrimitive(
      "carousel",
      tvSlots,
      computedPrimitive(() => props.ui as Record<string, SlotClassPrimitive> | undefined),
    );
    return () =>
      h(
        ArkControlPrimitive as any,
        { "data-slot": "control", class: resolved.value.control(), ...attrs },
        slots,
      );
  },
});

export const CarouselItemGroup = defineComponent({
  name: "CarouselItemGroup",
  inheritAttrs: false,
  props: {
    ui: { type: Object as PropType<CarouselUI>, required: false, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const tvSlots = computedPrimitive(() => carouselPrimitive({}));
    const resolved = useComponentUIPrimitive(
      "carousel",
      tvSlots,
      computedPrimitive(() => props.ui as Record<string, SlotClassPrimitive> | undefined),
    );
    return () =>
      h(
        ArkItemGroupPrimitive as any,
        { "data-slot": "itemGroup", class: resolved.value.itemGroup(), ...attrs },
        slots,
      );
  },
});

export const CarouselItem = defineComponent({
  name: "CarouselItem",
  inheritAttrs: false,
  props: {
    index: { type: Number as PropType<number>, required: true },
    ui: { type: Object as PropType<CarouselUI>, required: false, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const tvSlots = computedPrimitive(() => carouselPrimitive({}));
    const resolved = useComponentUIPrimitive(
      "carousel",
      tvSlots,
      computedPrimitive(() => props.ui as Record<string, SlotClassPrimitive> | undefined),
    );
    return () =>
      h(
        ArkItemPrimitive as any,
        { "data-slot": "item", index: props.index, class: resolved.value.item(), ...attrs },
        slots,
      );
  },
});

export const CarouselIndicatorGroup = defineComponent({
  name: "CarouselIndicatorGroup",
  inheritAttrs: false,
  props: {
    ui: { type: Object as PropType<CarouselUI>, required: false, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const tvSlots = computedPrimitive(() => carouselPrimitive({}));
    const resolved = useComponentUIPrimitive(
      "carousel",
      tvSlots,
      computedPrimitive(() => props.ui as Record<string, SlotClassPrimitive> | undefined),
    );
    return () =>
      h(
        ArkIndicatorGroupPrimitive as any,
        { "data-slot": "indicatorGroup", class: resolved.value.indicatorGroup(), ...attrs },
        slots,
      );
  },
});

export const CarouselIndicator = defineComponent({
  name: "CarouselIndicator",
  inheritAttrs: false,
  props: {
    index: { type: Number as PropType<number>, required: true },
    ui: { type: Object as PropType<CarouselUI>, required: false, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const tvSlots = computedPrimitive(() => carouselPrimitive({}));
    const resolved = useComponentUIPrimitive(
      "carousel",
      tvSlots,
      computedPrimitive(() => props.ui as Record<string, SlotClassPrimitive> | undefined),
    );
    return () =>
      h(
        ArkIndicatorPrimitive as any,
        {
          "data-slot": "indicator",
          index: props.index,
          class: resolved.value.indicator(),
          ...attrs,
        },
        slots,
      );
  },
});

export const CarouselPrevTrigger = defineComponent({
  name: "CarouselPrevTrigger",
  inheritAttrs: false,
  props: {
    ui: { type: Object as PropType<CarouselUI>, required: false, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const tvSlots = computedPrimitive(() => carouselPrimitive({}));
    const resolved = useComponentUIPrimitive(
      "carousel",
      tvSlots,
      computedPrimitive(() => props.ui as Record<string, SlotClassPrimitive> | undefined),
    );
    return () =>
      h(
        ArkPrevTriggerPrimitive as any,
        { "data-slot": "prevTrigger", class: resolved.value.prevTrigger(), ...attrs },
        slots.default ? slots : { default: () => h(ChevronLeftPrimitive) },
      );
  },
});

export const CarouselNextTrigger = defineComponent({
  name: "CarouselNextTrigger",
  inheritAttrs: false,
  props: {
    ui: { type: Object as PropType<CarouselUI>, required: false, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const tvSlots = computedPrimitive(() => carouselPrimitive({}));
    const resolved = useComponentUIPrimitive(
      "carousel",
      tvSlots,
      computedPrimitive(() => props.ui as Record<string, SlotClassPrimitive> | undefined),
    );
    return () =>
      h(
        ArkNextTriggerPrimitive as any,
        { "data-slot": "nextTrigger", class: resolved.value.nextTrigger(), ...attrs },
        slots.default ? slots : { default: () => h(ChevronRightPrimitive) },
      );
  },
});
</script>

<script setup lang="ts">
import { computed } from "vue";
import {
  CarouselRoot as ArkRoot,
  CarouselControl as ArkControl,
  CarouselItemGroup as ArkItemGroup,
  CarouselItem as ArkItem,
  CarouselIndicatorGroup as ArkIndicatorGroup,
  CarouselIndicator as ArkIndicator,
  CarouselPrevTrigger as ArkPrevTrigger,
  CarouselNextTrigger as ArkNextTrigger,
} from "@ark-ui/vue/carousel";
import { carousel, type CarouselVariants, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../composables/useComponentUI";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { twMerge } from "tailwind-merge";

function applySlotClass(base: string, slotClass?: SlotClass): string {
  if (!slotClass) return base;
  if (typeof slotClass === "function") return slotClass(base);
  return twMerge(base, slotClass);
}

const props = withDefaults(
  defineProps<{
    items?: CarouselItem[];
    orientation?: CarouselVariants["orientation"];
    slideCount?: number;
    defaultPage?: number;
    page?: number;
    loop?: boolean;
    autoplay?: boolean | { delay: number };
    spacing?: string;
    slidesPerPage?: number;
    slidesPerMove?: number | "auto";
    ui?: CarouselUI;
    showIndicators?: boolean;
    showControls?: boolean;
  }>(),
  {
    items: undefined,
    orientation: undefined,
    slideCount: undefined,
    defaultPage: undefined,
    page: undefined,
    loop: false,
    autoplay: false,
    spacing: undefined,
    slidesPerPage: undefined,
    slidesPerMove: undefined,
    ui: undefined,
    showIndicators: true,
    showControls: true,
  },
);

const emit = defineEmits<{
  "update:page": [page: number];
  pageChange: [details: { page: number }];
  autoplayStatusChange: [details: { isPlaying: boolean }];
  dragStatusChange: [details: { isDragging: boolean }];
}>();

const count = computed(() => props.items?.length ?? props.slideCount ?? 0);

const tvSlots = computed(() => carousel({ orientation: props.orientation }));

const resolved = useComponentUI(
  "carousel",
  tvSlots,
  computed(() => props.ui as Record<string, SlotClass> | undefined),
);

function onUpdatePage(page: number) {
  emit("update:page", page);
}

function onPageChange(details: { page: number }) {
  emit("pageChange", details);
}

function onAutoplayStatusChange(details: { isPlaying: boolean }) {
  emit("autoplayStatusChange", details);
}

function onDragStatusChange(details: { isDragging: boolean }) {
  emit("dragStatusChange", details);
}
</script>

<template>
  <ArkRoot
    :slide-count="count"
    :orientation="orientation"
    :default-page="defaultPage"
    :page="page"
    :loop="loop"
    :autoplay="autoplay"
    :spacing="spacing"
    :slides-per-page="slidesPerPage"
    :slides-per-move="slidesPerMove"
    data-slot="root"
    :class="resolved.root()"
    @update:page="onUpdatePage"
    @page-change="onPageChange"
    @autoplay-status-change="onAutoplayStatusChange"
    @drag-status-change="onDragStatusChange"
  >
    <slot>
      <template v-if="items?.length">
        <ArkControl v-if="showControls" data-slot="control" :class="resolved.control()">
          <ArkPrevTrigger data-slot="prevTrigger" :class="resolved.prevTrigger()">
            <slot name="prevIcon"><ChevronLeft /></slot>
          </ArkPrevTrigger>
          <ArkNextTrigger data-slot="nextTrigger" :class="resolved.nextTrigger()">
            <slot name="nextIcon"><ChevronRight /></slot>
          </ArkNextTrigger>
        </ArkControl>

        <ArkItemGroup data-slot="itemGroup" :class="resolved.itemGroup()">
          <ArkItem
            v-for="(item, index) in items"
            :key="index"
            :index="index"
            data-slot="item"
            :class="applySlotClass(resolved.item(), item.ui?.item as SlotClass | undefined)"
          >
            <slot name="item" :item="item" :index="index">
              {{ item.content }}
            </slot>
          </ArkItem>
        </ArkItemGroup>

        <ArkIndicatorGroup
          v-if="showIndicators"
          data-slot="indicatorGroup"
          :class="resolved.indicatorGroup()"
        >
          <ArkIndicator
            v-for="(_, index) in items"
            :key="index"
            :index="index"
            data-slot="indicator"
            :class="
              applySlotClass(
                resolved.indicator(),
                (items[index] as CarouselItem)?.ui?.indicator as SlotClass | undefined,
              )
            "
          />
        </ArkIndicatorGroup>
      </template>
      <slot v-else name="empty" />
    </slot>
  </ArkRoot>
</template>
