<script setup lang="ts">
import { ScrollArea } from "@75neo/vue/scroll-area";
import { scrollAreaSchema } from "@75neo/themes";

const sizes = scrollAreaSchema.size.values;
const lines = Array.from({ length: 14 }, (_, index) => `Line ${index + 1}`);

const frame = "h-32 w-full rounded-lg ring ring-default ring-inset";
const body = "flex flex-col gap-2 p-3 text-sm text-toned";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <ScrollArea :size="size" :class="frame">
            <div :class="body">
              <p v-for="line in lines" :key="line">{{ line }}</p>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>horizontal</p>
        <div :class="rowItems">
          <ScrollArea orientation="horizontal" :class="frame">
            <div class="flex w-max gap-2 p-3 text-sm text-toned">
              <p v-for="line in lines" :key="line" class="shrink-0">{{ line }}</p>
            </div>
          </ScrollArea>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>both</p>
        <div :class="rowItems">
          <ScrollArea orientation="both" :class="frame">
            <div class="flex w-max flex-col gap-2 p-3 text-sm text-toned">
              <p v-for="line in lines" :key="line" class="whitespace-nowrap">
                {{ line }} — and a good deal more text than fits across
              </p>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  </div>
</template>
