<script setup lang="ts">
import { Toc as Ark } from "@ark-ui/vue/toc";
import { type TableOfContentsProps, tableOfContents } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

const props = withDefaults(
  defineProps<
    TableOfContentsProps & {
      class?: unknown;
      activeIds?: string[];
      /**
       * The scrolling element to watch. Defaults to the page itself, which is what a
       * documentation page wants; pass one when the prose scrolls inside a panel.
       */
      scrollEl?: () => HTMLElement | null;
    }
  >(),
  { title: "On this page" },
);

const emit = defineEmits<{
  /** Fired when the headings currently on screen change. */
  activeChange: [details: { activeIds: string[] }];
}>();

const theme = useResolvedTheme(
  tableOfContents,
  "tableOfContents",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    data-slot="base"
    :class="theme.class.base"
    :items="props.items"
    :scroll-el="props.scrollEl"
    :active-ids="props.activeIds"
    :default-active-ids="props.defaultActiveIds"
    :root-margin="props.rootMargin"
    :auto-scroll="props.autoScroll"
    @active-change="emit('activeChange', $event)"
  >
    <Ark.Nav data-slot="nav" :class="theme.class.nav">
      <Ark.Title v-if="props.title !== ''" data-slot="title" :class="theme.class.title">
        {{ props.title }}
      </Ark.Title>

      <Ark.List data-slot="list" :class="theme.class.list">
        <Ark.Indicator data-slot="indicator" :class="theme.class.indicator" />
        <Ark.Item
          v-for="item in props.items"
          :key="item.value"
          :item="item"
          data-slot="item"
          :class="theme.class.item"
        >
          <Ark.Link data-slot="link" :class="theme.class.link" :href="`#${item.value}`">
            {{ item.label }}
          </Ark.Link>
        </Ark.Item>
      </Ark.List>
    </Ark.Nav>
  </Ark.Root>
</template>
