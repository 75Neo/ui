<script setup lang="ts">
import { PaginationContext } from "@ark-ui/vue/pagination";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from "@/components/vue";
</script>

<template>
  <div class="flex justify-center">
    <Pagination :count="128" :page-size="10" :sibling-count="1">
      <PaginationPrevTrigger aria-label="Previous page">
        <ChevronLeft />
      </PaginationPrevTrigger>

      <PaginationContext v-slot="pagination">
        <template v-for="(page, index) in pagination.pages" :key="index">
          <PaginationItem v-if="page.type === 'page'" :value="page.value" type="page">
            {{ page.value }}
          </PaginationItem>
          <PaginationEllipsis v-else :index="index">&#8230;</PaginationEllipsis>
        </template>
      </PaginationContext>

      <PaginationNextTrigger aria-label="Next page">
        <ChevronRight />
      </PaginationNextTrigger>
    </Pagination>
  </div>
</template>
