<script setup lang="ts">
import { ref } from "vue";
import { collapsible, variantValues } from "@75neo/themes";
import { Collapsible } from "@75neo/vue";
import { Sparkles } from "@lucide/vue";

const variants = variantValues(collapsible, "variant");
const sizes = variantValues(collapsible, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";

const body =
  "One recipe in @75neo/themes drives both adapters. The panel measures itself, hands " +
  "the height to the shared keyframes, and animates from there.";

const open = ref(false);
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="variant in variants" :key="variant" :class="row">
      <p :class="rowLabel" data-identifier>{{ variant }}</p>
      <Collapsible :variant="variant" :label="`The ${variant} variant`" default-open>
        {{ body }}
      </Collapsible>
    </div>

    <hr class="border-muted" />

    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Collapsible :size="size" :label="`The ${size} size`" :icon="Sparkles">
        {{ body }}
      </Collapsible>
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>disabled</p>
      <Collapsible label="Nothing opens this" disabled>{{ body }}</Collapsible>
    </div>

    <!-- A collapsedHeight clips the panel instead of hiding it, which is a "show more". -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>peek</p>
      <Collapsible label="Show more" collapsed-height="3rem" variant="soft">
        <p>{{ body }}</p>
        <p class="mt-2">
          A collapsed height leaves the panel clipped rather than hidden, so the first lines stay on
          the page and the rest slides in behind them.
        </p>
      </Collapsible>
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the button outside owns the state. -->
    <div class="flex flex-col gap-2">
      <button
        type="button"
        class="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
        @click="open = !open"
      >
        {{ open ? "Close from out here" : "Open from out here" }}
      </button>
      <Collapsible v-model:open="open" variant="ghost" label="Controlled">
        {{ body }}
      </Collapsible>
    </div>
  </div>
</template>
