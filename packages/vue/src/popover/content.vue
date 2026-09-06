<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cva } from "class-variance-authority";
import { cn, popoverDefaults, popoverSizeData, type PopoverContentProps } from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverContent = cva(
  "relative flex origin-(--transform-origin) flex-col rounded-xl bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: {
      size: popoverSizeData.base,
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
    PopoverContentProps & {
      class?: unknown;
      /** Render the panel at the end of `body`. @defaultValue `true` */
      portal?: boolean;
    }
  >(),
  { transition: true, portal: true },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = usePopoverVariants();
const contentClass = computed(() =>
  cn(
    popoverContent({ ...variants, transition: props.transition }),
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
    <Ark.Positioner data-slot="popover-positioner" class="z-50">
      <Ark.Content data-slot="popover-content" :class="contentClass">
        <slot />
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>
