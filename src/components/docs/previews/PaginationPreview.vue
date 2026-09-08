<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { PaginationContext } from "@ark-ui/vue/pagination";
import Pagination from "@/registry/vue/ui/pagination/Pagination.vue";
import PaginationEllipsis from "@/registry/vue/ui/pagination/PaginationEllipsis.vue";
import PaginationItem from "@/registry/vue/ui/pagination/PaginationItem.vue";
import PaginationNextTrigger from "@/registry/vue/ui/pagination/PaginationNextTrigger.vue";
import PaginationPrevTrigger from "@/registry/vue/ui/pagination/PaginationPrevTrigger.vue";
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
