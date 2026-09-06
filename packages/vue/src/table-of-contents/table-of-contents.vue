<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cn, tableOfContentsDefaults, type TableOfContentsRootProps } from "@75neo/themes";
import { tableOfContentsVariantsKey } from "./variants";
import TableOfContentsIndicator from "./indicator.vue";
import TableOfContentsItem from "./item.vue";
import TableOfContentsLink from "./link.vue";
import TableOfContentsList from "./list.vue";
import TableOfContentsNav from "./nav.vue";
import TableOfContentsTitle from "./title.vue";

const props = withDefaults(
  defineProps<
    TableOfContentsRootProps & {
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

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? tableOfContentsDefaults.color;
  },
  get size() {
    return props.size ?? tableOfContentsDefaults.size;
  },
});
provide(tableOfContentsVariantsKey, resolved);

const rootClass = computed(() => cn("min-w-0", props.class as string | undefined));
</script>

<template>
  <Ark.Root
    data-slot="table-of-contents"
    :class="rootClass"
    :items="props.items"
    :scroll-el="props.scrollEl"
    :active-ids="props.activeIds"
    :default-active-ids="props.defaultActiveIds"
    :root-margin="props.rootMargin"
    :auto-scroll="props.autoScroll"
    :data-color="resolved.color"
    :data-size="resolved.size"
    @active-change="emit('activeChange', $event)"
  >
    <TableOfContentsNav>
      <TableOfContentsTitle v-if="props.title !== ''">{{ props.title }}</TableOfContentsTitle>
      <TableOfContentsList>
        <TableOfContentsIndicator />
        <TableOfContentsItem v-for="item in props.items" :key="item.value" :item="item">
          <TableOfContentsLink :href="`#${item.value}`">{{ item.label }}</TableOfContentsLink>
        </TableOfContentsItem>
      </TableOfContentsList>
    </TableOfContentsNav>
  </Ark.Root>
</template>
