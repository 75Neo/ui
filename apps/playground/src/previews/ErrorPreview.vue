<script setup lang="ts">
import { TriangleAlert } from "@lucide/vue";
import { error, variantValues } from "@75neo/themes";
import { Button, Error } from "@75neo/vue";

const colors = variantValues(error, "color");
const label = "text-dimmed font-mono text-[0.6875rem] leading-none";
const frame = "overflow-hidden rounded-lg ring ring-default";

/*
 * The page fills the viewport less a Header, which a frame this size cannot show, so
 * each specimen is capped and the rest is the recipe's own.
 */
const short = { base: "min-h-56 py-8" };
const shorter = { base: "min-h-40 py-6" };
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <p :class="label" data-identifier>the whole page</p>
      <div :class="frame">
        <Error
          :ui="short"
          :icon="TriangleAlert"
          :status-code="404"
          status-message="Page not found"
          message="Nothing answers at that address. It may have moved, or never existed."
        >
          <Button>Back to home</Button>
          <Button variant="outline" color="neutral">Search the docs</Button>
        </Error>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <p :class="label" data-identifier>status only</p>
      <div :class="frame">
        <Error :ui="short" :status-code="500" status-message="Something went wrong" />
      </div>
    </div>

    <hr class="border-muted" />

    <div class="grid gap-4 @2xl:grid-cols-2">
      <div v-for="color in colors" :key="color" class="flex flex-col gap-2">
        <p :class="label" data-identifier>{{ color }}</p>
        <div :class="frame">
          <Error
            :ui="shorter"
            :color="color"
            :icon="TriangleAlert"
            :status-code="503"
            status-message="Down for maintenance"
          />
        </div>
      </div>
    </div>
  </div>
</template>
