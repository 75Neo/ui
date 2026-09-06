<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerContent = cva("rounded-md bg-default shadow-lg ring ring-accented outline-none", {
  variants: { size: datePickerSizeData.content },
  defaultVariants: datePickerDefaults,
});

const props = withDefaults(
  defineProps<{
    class?: unknown;
    /** Render the panel at the end of `body`. @defaultValue `true` */
    portal?: boolean;
    /** Whether the component has mounted: gates the teleport for SSR. */
    mounted?: boolean;
  }>(),
  { portal: true, mounted: false },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDatePickerVariants();
const contentClass = computed(() =>
  cn(datePickerContent(variants), props.class as string | undefined),
);
</script>

<template>
  <Teleport to="body" :disabled="!props.portal || !props.mounted">
    <Ark.Positioner data-slot="date-picker-positioner" class="z-50">
      <Ark.Content data-slot="date-picker-content" :class="contentClass">
        <slot />
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>
