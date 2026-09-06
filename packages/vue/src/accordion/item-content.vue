<script setup lang="ts">
import { computed } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { accordionSizeData, cn } from "@75neo/themes";
import { useAccordionVariants } from "./variants";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useAccordionVariants();
const bodyClass = computed(() =>
  cn(
    "min-w-0 text-pretty text-toned group-data-[orientation=horizontal]/accordion:w-max group-data-[orientation=horizontal]/accordion:max-w-sm",
    accordionSizeData.body[variants.size],
  ),
);
</script>

<template>
  <Ark.ItemContent
    data-slot="accordion-item-content"
    :class="
      cn(
        'overflow-hidden group-data-[orientation=horizontal]/accordion:h-full',
        props.class as string | undefined,
      )
    "
  >
    <div data-slot="accordion-body" :class="bodyClass">
      <slot />
    </div>
  </Ark.ItemContent>
</template>
