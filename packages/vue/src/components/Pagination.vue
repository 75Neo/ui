<script setup lang="ts">
import { type Component, computed } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "@lucide/vue";
import { pagination, type PaginationProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The page lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model:page`.
 */
const props = defineProps<
  PaginationProps<Component> & {
    defaultPage?: number;
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the page changes. */
  pageChange: [details: { page: number; pageSize: number }];
}>();

/*
 * `default: undefined` keeps an absent `v-model:page` absent. Without it the declared
 * prop would reach Ark as a value and pin the row to a controlled page, which would
 * leave `defaultPage` with nothing to do.
 */
const page = defineModel<number | undefined>("page", { default: undefined });

/*
 * One prop decides both. Ark needs to know it is rendering anchors and how to address
 * one, and a caller who has the addresses has already answered both questions — asking
 * for a `type` beside them would be asking twice.
 */
const linked = computed(() => props.href != null);
const pageUrl = computed(() =>
  props.href != null ? (details: { page: number }) => props.href!(details.page) : undefined,
);

/*
 * Ark hands every part the right props for the mode — a `type` and a `disabled` for a
 * button, an `href` for an anchor — but it always renders a `button`. So the element is
 * chosen once here and every part is written through `as-child`, which keeps the markup
 * one shape rather than branching six times.
 */
const cell = computed(() => (linked.value ? "a" : "button"));

const theme = useResolvedTheme(
  pagination,
  "pagination",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:page="page"
    data-slot="base"
    :class="theme.class.base"
    :count="props.count"
    :page-size="props.pageSize"
    :sibling-count="props.siblingCount"
    :boundary-count="props.boundaryCount"
    :default-page="props.defaultPage"
    :type="linked ? 'link' : 'button'"
    :get-page-url="pageUrl"
    @page-change="emit('pageChange', $event)"
  >
    <Ark.FirstTrigger v-if="props.edges" as-child>
      <component :is="cell" data-slot="firstTrigger" :class="theme.class.firstTrigger">
        <component :is="props.firstIcon ?? ChevronsLeft" />
      </component>
    </Ark.FirstTrigger>
    <Ark.PrevTrigger as-child>
      <component :is="cell" data-slot="prevTrigger" :class="theme.class.prevTrigger">
        <component :is="props.prevIcon ?? ChevronLeft" />
      </component>
    </Ark.PrevTrigger>

    <!--
      Ark works out which pages to show from the count, the page size and the two window
      props, and hands back the row already interleaved with its gaps.
    -->
    <Ark.Context v-slot="api">
      <template v-for="(entry, index) in api.pages">
        <Ark.Item
          v-if="entry.type === 'page'"
          :key="`page-${entry.value}`"
          type="page"
          :value="entry.value"
          as-child
        >
          <component :is="cell" data-slot="item" :class="theme.class.item">
            {{ entry.value }}
          </component>
        </Ark.Item>
        <Ark.Ellipsis
          v-else
          :key="`gap-${index}`"
          :index="index"
          data-slot="ellipsis"
          :class="theme.class.ellipsis"
        >
          &hellip;
        </Ark.Ellipsis>
      </template>
    </Ark.Context>

    <Ark.NextTrigger as-child>
      <component :is="cell" data-slot="nextTrigger" :class="theme.class.nextTrigger">
        <component :is="props.nextIcon ?? ChevronRight" />
      </component>
    </Ark.NextTrigger>
    <Ark.LastTrigger v-if="props.edges" as-child>
      <component :is="cell" data-slot="lastTrigger" :class="theme.class.lastTrigger">
        <component :is="props.lastIcon ?? ChevronsRight" />
      </component>
    </Ark.LastTrigger>
  </Ark.Root>
</template>
