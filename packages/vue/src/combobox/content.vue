<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cva } from "class-variance-authority";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxContent = cva(
  "flex max-h-60 min-w-(--reference-width) flex-col overflow-hidden rounded-md bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: { size: comboboxSizeData.content },
    defaultVariants: comboboxDefaults,
  },
);

const props = withDefaults(
  defineProps<{
    class?: unknown;
    /** Render the panel at the end of `body`. @defaultValue `true` */
    portal?: boolean;
  }>(),
  { portal: true },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = useComboboxVariants();
const contentClass = computed(() =>
  cn(comboboxContent(variants), props.class as string | undefined),
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
    <Ark.Positioner data-slot="combobox-positioner" class="z-50">
      <Ark.Content data-slot="combobox-content" :class="contentClass">
        <slot />
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>
