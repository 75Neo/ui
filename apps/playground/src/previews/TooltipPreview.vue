<script setup lang="ts">
import { Button } from "@75neo/vue/button";
import { Tooltip } from "@75neo/vue/tooltip";
import { tooltipSchema } from "@75neo/themes";

const sizes = tooltipSchema.size.values;
const placements = ["top", "right", "bottom", "left"] as const;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>sizes</p>
        <div :class="rowItems">
          <Tooltip v-for="size in sizes" :key="size" :size="size" text="Copied to the clipboard">
            <Button variant="outline" color="neutral" size="sm">{{ size }}</Button>
          </Tooltip>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>placement</p>
        <div :class="rowItems">
          <Tooltip
            v-for="placement in placements"
            :key="placement"
            :placement="placement"
            :text="placement"
            arrow
          >
            <Button variant="outline" color="neutral" size="sm">{{ placement }}</Button>
          </Tooltip>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>arrow</p>
        <div :class="rowItems">
          <Tooltip text="With a triangle" arrow>
            <Button variant="outline" color="neutral" size="sm">arrow</Button>
          </Tooltip>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <Tooltip text="Never shown" disabled>
            <Button variant="outline" color="neutral" size="sm">disabled</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
