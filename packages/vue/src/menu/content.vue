<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cva } from "class-variance-authority";
import { cn, menuDefaults, menuSizeData, type MenuContentProps } from "@75neo/themes";
import { useMenuVariants } from "./variants";

const menuContent = cva(
  "relative flex max-h-(--available-height) min-w-40 origin-(--transform-origin) flex-col overflow-y-auto overscroll-contain rounded-md bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: {
      size: menuSizeData.base,
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    defaultVariants: { ...menuDefaults, transition: true },
  },
);

const props = withDefaults(
  defineProps<
    MenuContentProps & {
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

const variants = useMenuVariants();
const contentClass = computed(() =>
  cn(menuContent({ ...variants, transition: props.transition }), props.class as string | undefined),
);

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the panel is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <Teleport to="body" :disabled="!props.portal || !mounted">
    <Ark.Positioner data-slot="menu-positioner" class="z-50">
      <Ark.Content data-slot="menu-content" :class="contentClass">
        <slot />
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>
