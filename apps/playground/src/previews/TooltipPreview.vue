<script setup lang="ts">
import { Info } from "@lucide/vue";
import { tooltip, variantValues } from "@75neo/themes";
import { Button, type Placement, Tooltip } from "@75neo/vue";

const sizes = variantValues(tooltip, "size");

const placements: Placement[] = ["top", "right", "bottom", "left"];

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Tooltip :size="size" :text="`A bubble at ${size}`" :open-delay="0">
        <Button variant="outline" color="neutral">Hover me</Button>
      </Tooltip>
    </div>

    <hr class="border-muted" />

    <!--
      The bubble grows from the edge nearest its trigger, which is the positioner's own
      transform origin rather than anything the recipe has to branch on.
    -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>placement</p>
      <div class="flex flex-wrap items-center gap-3">
        <Tooltip
          v-for="placement in placements"
          :key="placement"
          :placement="placement"
          :text="placement"
          arrow
          :open-delay="0"
        >
          <Button variant="soft" color="neutral">{{ placement }}</Button>
        </Tooltip>
      </div>
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-center gap-6">
      <Tooltip text="Stays open while the pointer is over it" interactive :open-delay="0">
        <Button variant="ghost" color="neutral" :leading-icon="Info">Interactive</Button>
      </Tooltip>

      <Tooltip text="Never shown" disabled :open-delay="0">
        <Button variant="ghost" color="neutral">Disabled</Button>
      </Tooltip>

      <!-- The `content` slot takes markup where `text` takes a string. -->
      <Tooltip :open-delay="0" placement="bottom" arrow>
        <Button variant="ghost" color="neutral">Rich content</Button>
        <template #content>
          <span class="flex items-center gap-1.5">
            <Info class="size-3.5" />
            Markup, not just a string
          </span>
        </template>
      </Tooltip>
    </div>
  </div>
</template>
