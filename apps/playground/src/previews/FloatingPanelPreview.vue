<script setup lang="ts">
import { FloatingPanel } from "@75neo/vue/floating-panel";
import { floatingPanelSchema } from "@75neo/themes";

const sizes = floatingPanelSchema.size.values;

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
          <FloatingPanel
            :size="size"
            title="Notes"
            body="Drag the header, stage the window, pull a corner to resize."
          >
            <button type="button">Open {{ size }}</button>
          </FloatingPanel>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>open</p>
        <div :class="rowItems">
          <FloatingPanel
            title="Pinned open"
            body="This one starts open, so the panel is on the page."
            default-open
          >
            <button type="button">Toggle</button>
          </FloatingPanel>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>close off</p>
        <div :class="rowItems">
          <FloatingPanel title="No cross" body="Stage buttons only." :close="false">
            <button type="button">Staged</button>
          </FloatingPanel>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>fixed</p>
        <div :class="rowItems">
          <FloatingPanel title="Fixed" body="The panel holds still on scroll." strategy="fixed">
            <button type="button">Fixed</button>
          </FloatingPanel>
        </div>
      </div>
    </div>
  </div>
</template>
