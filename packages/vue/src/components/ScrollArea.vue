<script setup lang="ts">
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { scrollArea, type ScrollAreaProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

const props = withDefaults(
  defineProps<
    ScrollAreaProps & {
      class?: unknown;
      ids?: {
        root?: string;
        viewport?: string;
        content?: string;
        scrollbar?: string;
        thumb?: string;
      };
    }
  >(),
  /*
   * Named here because it is read below rather than handed to Ark, so no other
   * default ever sees it. A string prop needs nothing against the Boolean cast.
   */
  { orientation: "vertical" },
);

defineSlots<{
  /** The scrolling content. */
  default?: () => unknown;
}>();

const theme = useResolvedTheme(
  scrollArea,
  "scrollArea",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root data-slot="base" :class="theme.class.base" :ids="props.ids">
    <Ark.Viewport data-slot="viewport" :class="theme.class.viewport">
      <Ark.Content data-slot="content" :class="theme.class.content">
        <slot />
      </Ark.Content>
    </Ark.Viewport>

    <Ark.Scrollbar
      v-if="props.orientation === 'vertical' || props.orientation === 'both'"
      orientation="vertical"
      data-slot="scrollbar"
      :class="theme.class.scrollbar"
    >
      <Ark.Thumb data-slot="thumb" :class="theme.class.thumb" />
    </Ark.Scrollbar>
    <Ark.Scrollbar
      v-if="props.orientation === 'horizontal' || props.orientation === 'both'"
      orientation="horizontal"
      data-slot="scrollbar"
      :class="theme.class.scrollbar"
    >
      <Ark.Thumb data-slot="thumb" :class="theme.class.thumb" />
    </Ark.Scrollbar>
    <Ark.Corner
      v-if="props.orientation === 'both'"
      data-slot="corner"
      :class="theme.class.corner"
    />
  </Ark.Root>
</template>
