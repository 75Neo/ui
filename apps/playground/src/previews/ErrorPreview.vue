<script setup lang="ts">
import { TriangleAlert } from "@lucide/vue";
import { Button } from "@75neo/vue/button";
import { Error } from "@75neo/vue/error";
import { errorSchema } from "@75neo/themes";

const colors = errorSchema.color.values;
const frame = "min-h-44 rounded-lg bg-muted";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="color in colors" :key="color" :class="row">
        <p :class="rowLabel" data-identifier>{{ color }}</p>
        <div :class="rowItems">
          <Error
            :class="frame"
            :color="color"
            :icon="TriangleAlert"
            :status-code="404"
            status-message="Page not found"
          />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>bare</p>
        <div :class="rowItems">
          <Error :class="frame" :status-code="500" status-message="Something went wrong" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>full</p>
        <div :class="rowItems">
          <Error
            :class="frame"
            :icon="TriangleAlert"
            :status-code="404"
            status-message="Page not found"
            message="The page you asked for is not here."
          >
            <Button variant="outline" color="neutral">Go back</Button>
          </Error>
        </div>
      </div>
    </div>
  </div>
</template>
