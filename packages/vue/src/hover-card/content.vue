<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";
import { cva } from "class-variance-authority";
import {
  cn,
  hoverCardDefaults,
  hoverCardSizeData,
  type HoverCardContentProps,
} from "@75neo/themes";
import { useHoverCardVariants } from "./variants";

const hoverCardContent = cva(
  "relative flex origin-(--transform-origin) flex-col rounded-xl bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: {
      size: hoverCardSizeData.base,
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    defaultVariants: { size: "md", transition: true },
  },
);

const props = withDefaults(
  defineProps<
    HoverCardContentProps & {
      class?: unknown;
      /** Render the card at the end of `body`. @defaultValue `true` */
      portal?: boolean;
    }
  >(),
  { transition: true, portal: true },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = useHoverCardVariants();
const contentClass = computed(() =>
  cn(
    hoverCardContent({ ...variants, transition: props.transition }),
    props.class as string | undefined,
  ),
);

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the popup is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <Teleport to="body" :disabled="!props.portal || !mounted">
    <Ark.Positioner data-slot="hover-card-positioner" class="z-50">
      <Ark.Content data-slot="hover-card-content" :class="contentClass">
        <slot />
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>
