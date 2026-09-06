<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { carouselDefaults, cn, type CarouselRootProps } from "@75neo/themes";
import { carouselVariantsKey } from "./variants";
import CarouselControl from "./control.vue";
import CarouselIndicator from "./indicator.vue";
import CarouselIndicatorGroup from "./indicator-group.vue";
import CarouselItem from "./item.vue";
import CarouselItemGroup from "./item-group.vue";
import CarouselNextTrigger from "./next-trigger.vue";
import CarouselPrevTrigger from "./prev-trigger.vue";

const props = defineProps<
  CarouselRootProps & {
    class?: unknown;
  }
>();

const page = defineModel<number | undefined>("page", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? carouselDefaults.size;
  },
});
provide(carouselVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "group/carousel flex flex-col gap-4 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-0",
    props.class as string | undefined,
  ),
);
const items = computed(() => props.items ?? []);
</script>

<template>
  <Ark.Root
    v-model:page="page"
    :slide-count="items.length"
    :orientation="props.orientation"
    :loop="props.loop"
    :autoplay="props.autoplay"
    :slides-per-page="props.slidesPerPage"
    :spacing="props.spacing"
    :allow-mouse-drag="props.allowMouseDrag"
    data-slot="carousel"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <CarouselControl>
        <CarouselPrevTrigger />
        <CarouselItemGroup>
          <CarouselItem v-for="(item, index) in items" :key="item.id" :index="index">
            {{ item.content }}
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselIndicatorGroup>
        <CarouselIndicator v-for="(item, index) in items" :key="item.id" :index="index" />
      </CarouselIndicatorGroup>
    </template>
  </Ark.Root>
</template>
