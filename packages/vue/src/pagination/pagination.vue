<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cva } from "class-variance-authority";
import {
  cn,
  paginationDefaults,
  paginationSizeData,
  type PaginationRootProps,
} from "@75neo/themes";
import { paginationVariantsKey } from "./variants";
import PaginationEllipsis from "./ellipsis.vue";
import PaginationFirstTrigger from "./first-trigger.vue";
import PaginationItem from "./item.vue";
import PaginationLastTrigger from "./last-trigger.vue";
import PaginationNextTrigger from "./next-trigger.vue";
import PaginationPrevTrigger from "./prev-trigger.vue";

const paginationRoot = cva("flex items-center", {
  variants: { size: paginationSizeData.root },
  defaultVariants: paginationDefaults,
});

const props = defineProps<
  PaginationRootProps & {
    class?: unknown;
  }
>();

const page = defineModel<number | undefined>("page", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? paginationDefaults.color;
  },
  get size() {
    return props.size ?? paginationDefaults.size;
  },
  get linked() {
    return props.href != null;
  },
});
provide(paginationVariantsKey, resolved);

const rootClass = computed(() =>
  cn(paginationRoot({ size: resolved.size }), props.class as string | undefined),
);
const getPageUrl = computed(() => {
  const href = props.href;
  return href != null ? (details: { page: number }) => href(details.page) : undefined;
});
</script>

<template>
  <Ark.Root
    v-model:page="page"
    :count="props.count"
    :page-size="props.pageSize"
    :sibling-count="props.siblingCount"
    :boundary-count="props.boundaryCount"
    :type="resolved.linked ? 'link' : 'button'"
    :get-page-url="getPageUrl"
    data-slot="pagination"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <PaginationFirstTrigger v-if="props.edges" />
      <PaginationPrevTrigger />
      <!-- Ark works out which pages to show and hands back the row with its gaps. -->
      <Ark.Context v-slot="api">
        <template v-for="(entry, index) in api.pages">
          <PaginationItem
            v-if="entry.type === 'page'"
            :key="`page-${entry.value}`"
            :value="entry.value"
          />
          <PaginationEllipsis v-else :key="`gap-${index}`" :index="index" />
        </template>
      </Ark.Context>
      <PaginationNextTrigger />
      <PaginationLastTrigger v-if="props.edges" />
    </template>
  </Ark.Root>
</template>
