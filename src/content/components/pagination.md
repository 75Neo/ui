---
title: Pagination
description: Page numbers with first, previous, next and last controls.
category: Navigation
registryItem: pagination
---

## Usage

The pages are computed for you. Read them from the context component and render an item or an
ellipsis for each entry.

```vue
<template>
  <Pagination :count="128" :page-size="10" :sibling-count="1">
    <PaginationPrevTrigger aria-label="Previous page">
      <ChevronLeft />
    </PaginationPrevTrigger>

    <PaginationContext v-slot="pagination">
      <template v-for="(page, index) in pagination.pages" :key="index">
        <PaginationItem v-if="page.type === 'page'" :value="page.value" type="page">
          {{ page.value }}
        </PaginationItem>
        <PaginationEllipsis v-else :index="index">…</PaginationEllipsis>
      </template>
    </PaginationContext>

    <PaginationNextTrigger aria-label="Next page">
      <ChevronRight />
    </PaginationNextTrigger>
  </Pagination>
</template>
```

## Counting

`count` is the number of records, not the number of pages. Divide by `pageSize` yourself only if
you need the page total for something else; the component already has it.

`siblingCount` decides how many numbers sit either side of the current page before the ellipsis
takes over. One is usually enough. Three turns the control into a ruler.

## Buttons or links

`type="link"` renders anchors instead of buttons and calls `getPageUrl` for each href, so pages are
crawlable and middle clickable. Use it whenever the page is reachable by URL, which it should be.

## First and last

`PaginationFirstTrigger` and `PaginationLastTrigger` are optional. Add them when the collection is
long enough that dragging back to page one through the ellipsis is tedious.
