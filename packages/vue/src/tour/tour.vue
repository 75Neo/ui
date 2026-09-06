<script setup lang="ts">
import { type Component, computed, onMounted, provide, reactive, ref, type UnwrapRef } from "vue";
import { Tour as Ark, useTour } from "@ark-ui/vue/tour";
import { X as XIcon } from "@lucide/vue";
import { cn, tourDefaults, type TourRootProps as TourContract } from "@75neo/themes";
import { tourVariantsKey } from "./variants";
import TourActions from "./actions.vue";
import TourActionTrigger from "./action-trigger.vue";
import TourArrow from "./arrow.vue";
import TourBackdrop from "./backdrop.vue";
import TourCloseTrigger from "./close-trigger.vue";
import TourContent from "./content.vue";
import TourControl from "./control.vue";
import TourDescription from "./description.vue";
import TourPositioner from "./positioner.vue";
import TourProgressText from "./progress-text.vue";
import TourSpotlight from "./spotlight.vue";
import TourTitle from "./title.vue";

/*
 * `arrow`, `close` and `portal` default to on, so each is declared: without the
 * declaration Vue casts an absent boolean to `false` and the triangle, the cross
 * and the teleport vanish on a bare tour.
 */
const props = withDefaults(
  defineProps<
    TourContract<Component, UnwrapRef<ReturnType<typeof useTour>>> & {
      class?: unknown;
    }
  >(),
  { arrow: true, close: true, portal: true },
);

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? tourDefaults.size;
  },
});
provide(tourVariantsKey, resolved);

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the overlay is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const teleportDisabled = computed(() => !props.portal || !mounted.value);
</script>

<template>
  <Ark.Root
    data-slot="tour"
    :data-size="resolved.size"
    :tour="props.tour"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
  >
    <Teleport to="body" :disabled="teleportDisabled">
      <TourBackdrop />
      <TourSpotlight />
      <TourPositioner>
        <TourContent :class="cn(props.class as string | undefined)">
          <TourArrow v-if="props.arrow" />
          <TourProgressText />
          <TourTitle />
          <TourDescription />
          <TourControl>
            <TourActions v-slot="{ actions }">
              <TourActionTrigger
                v-for="stepAction in actions"
                :key="stepAction.label"
                :action="stepAction"
              >
                {{ stepAction.label }}
              </TourActionTrigger>
            </TourActions>
          </TourControl>
          <TourCloseTrigger v-if="props.close" aria-label="Close tour">
            <component :is="props.closeIcon ?? XIcon" />
          </TourCloseTrigger>
          <slot />
        </TourContent>
      </TourPositioner>
    </Teleport>
  </Ark.Root>
</template>
