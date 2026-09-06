<script setup lang="ts">
import { Popover } from "@75neo/vue/popover";
import { popoverSchema } from "@75neo/themes";

const sizes = popoverSchema.size.values;

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
          <Popover
            :size="size"
            title="About this row"
            description="A quieter line under the heading."
            body="The panel's main content sits under both."
          >
            <button type="button">Open {{ size }}</button>
          </Popover>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>arrow</p>
        <div :class="rowItems">
          <Popover title="Pointing back" body="The triangle aims at the trigger." arrow>
            <button type="button">Aimed</button>
          </Popover>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>close</p>
        <div :class="rowItems">
          <Popover title="Dismissable" body="The cross closes the panel." close>
            <button type="button">Closable</button>
          </Popover>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>placement</p>
        <div :class="rowItems">
          <Popover title="On top" body="The panel prefers the top edge." placement="top">
            <button type="button">Above</button>
          </Popover>
        </div>
      </div>
    </div>
  </div>
</template>
