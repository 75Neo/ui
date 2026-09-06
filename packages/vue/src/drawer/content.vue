<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cva } from "class-variance-authority";
import {
  cn,
  drawerDefaults,
  drawerPanelCompoundData,
  drawerPlacementData,
  type DrawerContentProps,
} from "@75neo/themes";
import { useDrawerVariants } from "./variants";

const drawerContent = cva(
  "relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-default shadow-2xl ring ring-accented outline-none",
  {
    variants: {
      placement: drawerPlacementData.base,
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    compoundVariants: drawerPanelCompoundData,
    defaultVariants: drawerDefaults,
  },
);

const props = withDefaults(
  defineProps<
    DrawerContentProps & {
      class?: unknown;
      /** Render the panel at the end of `body`. @defaultValue `true` */
      portal?: boolean;
      draggable?: boolean;
    }
  >(),
  { transition: true, portal: true },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDrawerVariants();
const contentClass = computed(() =>
  cn(
    drawerContent({ ...variants, transition: props.transition }),
    props.class as string | undefined,
  ),
);
const positionerClass = computed(() =>
  cn("fixed inset-0 flex", drawerPlacementData.positioner[variants.placement]),
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
    <Ark.Positioner data-slot="drawer-positioner" :class="positionerClass">
      <Ark.Content data-slot="drawer-content" :class="contentClass" :draggable="props.draggable">
        <slot />
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>
