<script setup lang="ts">
import { type Component, computed } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { cva } from "class-variance-authority";
import { cn, switchDefaults, switchSizeData } from "@75neo/themes";
import { useSwitchVariants } from "./variants";

const switchThumb = cva(
  "group/thumb pointer-events-none flex items-center justify-center rounded-full bg-default text-default shadow-sm",
  {
    variants: { size: switchSizeData.thumb },
    defaultVariants: switchDefaults,
  },
);

const switchCheckedIcon = cva(
  "hidden shrink-0 group-data-[state=checked]/thumb:block [&>svg]:size-full",
  {
    variants: {
      size: switchSizeData.checkedIcon,
      loading: { true: "animate-spin", false: "" },
    },
    defaultVariants: switchDefaults,
  },
);

const switchUncheckedIcon = cva(
  "block shrink-0 group-data-[state=checked]/thumb:hidden [&>svg]:size-full",
  {
    variants: {
      size: switchSizeData.uncheckedIcon,
      loading: { true: "animate-spin", false: "" },
    },
    defaultVariants: switchDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** Shown inside the thumb while on. Spins while loading. */
  checkedIcon?: Component;
  /** Shown inside the thumb while off. Spins while loading. */
  uncheckedIcon?: Component;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSwitchVariants();
const thumbClass = computed(() => cn(switchThumb(variants), props.class as string | undefined));
const checkedClass = computed(() => cn(switchCheckedIcon(variants)));
const uncheckedClass = computed(() => cn(switchUncheckedIcon(variants)));
</script>

<template>
  <Ark.Thumb data-slot="switch-thumb" :class="thumbClass">
    <slot>
      <span data-slot="switch-checked-icon" :class="checkedClass">
        <component :is="props.checkedIcon" v-if="props.checkedIcon" />
      </span>
      <span data-slot="switch-unchecked-icon" :class="uncheckedClass">
        <component :is="props.uncheckedIcon" v-if="props.uncheckedIcon" />
      </span>
    </slot>
  </Ark.Thumb>
</template>
