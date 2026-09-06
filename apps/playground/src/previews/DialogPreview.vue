<script setup lang="ts">
import { Dialog } from "@75neo/vue/dialog";
import { dialogSchema } from "@75neo/themes";

const sizes = dialogSchema.size.values;

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
          <Dialog
            :size="size"
            title="Delete project?"
            description="This cannot be undone."
            body="The project and its history leave the workspace for good."
            footer="Cancel"
          >
            <button type="button">Open {{ size }}</button>
          </Dialog>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>overlay off</p>
        <div :class="rowItems">
          <Dialog title="No backdrop" body="The page behind stays interactive." :overlay="false">
            <button type="button">Bare</button>
          </Dialog>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>close off</p>
        <div :class="rowItems">
          <Dialog
            title="Must choose"
            body="Answer through the footer."
            :close="false"
            footer="Answer"
          >
            <button type="button">Choose</button>
          </Dialog>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>fullscreen</p>
        <div :class="rowItems">
          <Dialog title="Full page" body="The panel takes the viewport." fullscreen>
            <button type="button">Expand</button>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>
