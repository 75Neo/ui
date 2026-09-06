<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";
import { cva } from "class-variance-authority";
import { cn, tooltipDefaults, tooltipSizeData, type TooltipContentProps } from "@75neo/themes";
import { useTooltipVariants } from "./variants";

const tooltipContent = cva(
  "max-w-xs origin-(--transform-origin) rounded-md bg-inverted text-inverted shadow-md select-none",
  {
    variants: {
      size: tooltipSizeData.content,
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    defaultVariants: { ...tooltipDefaults, transition: true },
  },
);

/*
 * `transition` and `portal` default to on, so each is declared: without the
 * declaration Vue casts an absent boolean to `false` and the bubble stops animating
 * and stops leaving its overflow-hidden ancestor.
 */
const props = withDefaults(
  defineProps<
    TooltipContentProps & {
      /** Render the bubble at the end of `body`. @defaultValue `true` */
      portal?: boolean;
      class?: unknown;
    }
  >(),
  { transition: true, portal: true },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTooltipVariants();
const contentClass = computed(() =>
  cn(
    tooltipContent({ size: variants.size, transition: props.transition }),
    props.class as string | undefined,
  ),
);

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the bubble is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
const teleportDisabled = computed(() => !props.portal || !mounted.value);
</script>

<template>
  <Teleport to="body" :disabled="teleportDisabled">
    <Ark.Positioner data-slot="tooltip-positioner" class="z-50">
      <Ark.Content data-slot="tooltip-content" :class="contentClass">
        <slot />
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>
