<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn, scrollAreaDefaults, type ScrollAreaRootProps } from "@75neo/themes";
import { scrollAreaVariantsKey } from "./variants";
import ScrollAreaContent from "./content.vue";
import ScrollAreaCorner from "./corner.vue";
import ScrollAreaScrollbar from "./scrollbar.vue";
import ScrollAreaViewport from "./viewport.vue";

const props = withDefaults(
  defineProps<
    ScrollAreaRootProps & {
      class?: unknown;
    }
  >(),
  { orientation: "vertical" },
);

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? scrollAreaDefaults.size;
  },
});
provide(scrollAreaVariantsKey, resolved);

const rootClass = computed(() =>
  cn("group/scroll-area relative min-w-0 overflow-hidden", props.class as string | undefined),
);
const both = computed(() => props.orientation === "both");
</script>

<template>
  <Ark.Root data-slot="scroll-area" :data-size="resolved.size" :class="rootClass">
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <slot />
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar v-if="both || props.orientation === 'vertical'" orientation="vertical" />
    <ScrollAreaScrollbar
      v-if="both || props.orientation === 'horizontal'"
      orientation="horizontal"
    />
    <ScrollAreaCorner v-if="both" />
  </Ark.Root>
</template>
