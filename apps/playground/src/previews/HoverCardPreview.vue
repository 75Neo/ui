<script setup lang="ts">
import { HoverCard } from "@75neo/vue/hover-card";
import { hoverCardSchema } from "@75neo/themes";

const sizes = hoverCardSchema.size.values;

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
          <HoverCard
            :size="size"
            title="@handle"
            description="Joined in 2021 · 4.2k followers"
            body="Hover the name to see who is behind it."
          >
            <button type="button">Hover {{ size }}</button>
          </HoverCard>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>arrow</p>
        <div :class="rowItems">
          <HoverCard title="@handle" body="The triangle aims at the trigger." arrow>
            <button type="button">Aimed</button>
          </HoverCard>
        </div>
      </div>
    </div>
  </div>
</template>
