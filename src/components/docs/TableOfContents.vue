<script setup lang="ts">
import { computed } from "vue";
import Toc from "@/registry/vue/ui/toc/Toc.vue";
import TocIndicator from "@/registry/vue/ui/toc/TocIndicator.vue";
import TocItem from "@/registry/vue/ui/toc/TocItem.vue";
import TocLink from "@/registry/vue/ui/toc/TocLink.vue";
import TocList from "@/registry/vue/ui/toc/TocList.vue";
import TocTitle from "@/registry/vue/ui/toc/TocTitle.vue";
import type { DocsHeading } from "@/lib/docs";

const props = defineProps<{ headings: DocsHeading[] }>();

const items = computed(() =>
  props.headings.map((heading) => ({ value: heading.slug, depth: heading.depth })),
);
</script>

<template>
  <Toc :items="items" root-margin="-80px 0px -55% 0px">
    <TocTitle class="text-xs text-dimmed">On this page</TocTitle>
    <TocList>
      <TocIndicator />
      <TocItem
        v-for="heading in props.headings"
        :key="heading.slug"
        :item="{ value: heading.slug, depth: heading.depth }"
      >
        <TocLink :href="`#${heading.slug}`">{{ heading.text }}</TocLink>
      </TocItem>
    </TocList>
  </Toc>
</template>
