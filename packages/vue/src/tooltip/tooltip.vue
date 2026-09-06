<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";
import { tooltipDefaults, type TooltipRootProps } from "@75neo/themes";
import { tooltipVariantsKey } from "./variants";
import TooltipArrow from "./arrow.vue";
import TooltipContent from "./content.vue";
import TooltipTrigger from "./trigger.vue";

/*
 * `portal` defaults to on, so it is declared: without the declaration Vue casts an
 * absent boolean to `false` and the bubble stops leaving its clipping ancestor.
 */
const props = withDefaults(
  defineProps<
    TooltipRootProps & {
      /** Render the bubble at the end of `body`. @defaultValue `true` */
      portal?: boolean;
      class?: unknown;
    }
  >(),
  { portal: true, arrow: false, placement: "top", offset: 8 },
);

const open = defineModel<boolean | undefined>("open", { default: undefined });

defineSlots<{
  /** The element the bubble explains. It becomes the trigger. */
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? tooltipDefaults.size;
  },
});
provide(tooltipVariantsKey, resolved);

const positioning = computed(() => ({
  placement: props.placement,
  offset: { mainAxis: props.offset },
}));
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :open-delay="props.openDelay"
    :close-delay="props.closeDelay"
    :interactive="props.interactive"
    :disabled="props.disabled"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    :positioning="positioning"
  >
    <TooltipTrigger v-if="$slots.default">
      <slot />
    </TooltipTrigger>
    <TooltipContent
      v-if="props.text != null"
      :portal="props.portal"
      :class="props.class as string | undefined"
    >
      <TooltipArrow v-if="props.arrow" />
      {{ props.text }}
    </TooltipContent>
  </Ark.Root>
</template>
