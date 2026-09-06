<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cva } from "class-variance-authority";
import { cn, type FloatingPanelContentProps } from "@75neo/themes";

const floatingPanelContent = cva(
  "relative flex flex-col overflow-hidden rounded-xl bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: {
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    defaultVariants: { transition: true },
  },
);

const props = withDefaults(
  defineProps<
    FloatingPanelContentProps & {
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

const contentClass = computed(() =>
  cn(floatingPanelContent({ transition: props.transition }), props.class as string | undefined),
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
    <Ark.Positioner data-slot="floating-panel-positioner" class="z-50">
      <Ark.Content data-slot="floating-panel-content" :class="contentClass">
        <slot />
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>
