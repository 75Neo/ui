<script setup lang="ts">
import { popover, variantValues } from "@75neo/themes";
import { Button, type Placement, Popover } from "@75neo/vue";

const sizes = variantValues(popover, "size");

const placements: Placement[] = ["top", "right", "bottom", "left"];

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Popover :size="size" title="Notifications" description="Where the noisy ones go.">
        <Button variant="outline" color="neutral">Open ({{ size }})</Button>
        <template #body>
          Everything in this panel is addressed by name rather than handed in as markup.
        </template>
      </Popover>
    </div>

    <hr class="border-muted" />

    <!--
      The panel grows from the edge nearest its trigger, which is the positioner's own
      transform origin rather than anything the recipe branches on.
    -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>placement</p>
      <div class="flex flex-wrap items-center gap-3">
        <Popover v-for="placement in placements" :key="placement" :placement="placement" arrow>
          <Button variant="soft" color="neutral">{{ placement }}</Button>
          <template #body>Anchored to the {{ placement }} of its trigger.</template>
        </Popover>
      </div>
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-center gap-3">
      <Popover
        title="With a close button"
        description="The title keeps out of its way on its own."
        close
      >
        <Button variant="ghost" color="neutral">Closable</Button>
      </Popover>

      <Popover title="Modal" modal close>
        <Button variant="ghost" color="neutral">Modal</Button>
        <template #body>Focus is trapped and the page behind it is inert.</template>
      </Popover>

      <Popover title="Stays put" :dismissible="false" close>
        <Button variant="ghost" color="neutral">Not dismissible</Button>
        <template #body>
          Escape and a click outside are both off, so the close button is the only way out.
        </template>
      </Popover>
    </div>
  </div>
</template>
