<script setup lang="ts">
import { Toc, TocIndicator, TocItem, TocLink, TocList, TocTitle } from "@/components/vue";

const headings = [
  { slug: "examples", text: "Examples", depth: 2 },
  { slug: "example-overview", text: "Overview", depth: 3 },
  { slug: "installation", text: "Installation", depth: 2 },
  { slug: "api-reference", text: "API reference", depth: 2 },
];

const items = headings.map((heading) => ({ value: heading.slug, depth: heading.depth }));
</script>

<template>
  <div class="max-w-56">
    <Toc :items="items" root-margin="-80px 0px -55% 0px">
      <TocTitle class="text-xs text-dimmed">On this page</TocTitle>
      <TocList>
        <TocIndicator />
        <TocItem
          v-for="heading in headings"
          :key="heading.slug"
          :item="{ value: heading.slug, depth: heading.depth }"
        >
          <TocLink :href="`#${heading.slug}`">{{ heading.text }}</TocLink>
        </TocItem>
      </TocList>
    </Toc>
  </div>
</template>
