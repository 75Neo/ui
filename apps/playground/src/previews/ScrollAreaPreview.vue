<script setup lang="ts">
import { scrollArea, variantValues } from "@75neo/themes";
import { ScrollArea } from "@75neo/vue";

const sizes = variantValues(scrollArea, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <ScrollArea :size="size" class="h-48 rounded-lg ring ring-default ring-inset">
        <p v-for="index in 6" :key="index" class="mt-3 first:mt-0">
          Paragraph {{ index }}. The native scrollbar is hidden and the styled one shows while the
          pointer is over this region, while it holds focus, or while it scrolls.
        </p>
      </ScrollArea>
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>horizontal</p>
      <ScrollArea orientation="horizontal" class="rounded-lg ring ring-default ring-inset">
        <div class="flex gap-3 p-4">
          <div
            v-for="index in 12"
            :key="index"
            class="flex h-20 w-40 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-toned"
          >
            Card {{ index }}
          </div>
        </div>
      </ScrollArea>
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>both</p>
      <ScrollArea orientation="both" class="h-48 rounded-lg ring ring-default ring-inset">
        <div class="w-[50rem] p-4">
          <p v-for="index in 8" :key="index" class="mt-3 first:mt-0">
            Paragraph {{ index }}. The native scrollbar is hidden and the styled one shows while the
            pointer is over this region, while it holds focus, or while it scrolls.
          </p>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>
