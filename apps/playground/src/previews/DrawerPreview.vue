<script setup lang="ts">
import { Drawer } from "@75neo/vue/drawer";
import { drawerSchema } from "@75neo/themes";

const sizes = drawerSchema.size.values;
const placements = drawerSchema.placement.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Drawer
            :size="size"
            title="Settings"
            description="Tune the workspace."
            body="Every control lives in the panel, so the page behind stays put."
          >
            <button type="button">Open {{ size }}</button>
          </Drawer>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>placements</p>
        <div :class="rowItems">
          <Drawer
            v-for="placement in placements"
            :key="placement"
            :placement="placement"
            :title="placement"
            body="The panel docks to this edge."
          >
            <button type="button">{{ placement }}</button>
          </Drawer>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>close off</p>
        <div :class="rowItems">
          <Drawer
            title="Must choose"
            body="Answer through the footer."
            :close="false"
            footer="Answer"
          >
            <button type="button">Choose</button>
          </Drawer>
        </div>
      </div>
    </div>
  </div>
</template>
