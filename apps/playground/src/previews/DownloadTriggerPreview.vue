<script setup lang="ts">
import { DownloadTrigger } from "@75neo/vue/download-trigger";
import { downloadTriggerSchema } from "@75neo/themes";

const variants = downloadTriggerSchema.variant.values;
const colors = downloadTriggerSchema.color.values;
const sizes = downloadTriggerSchema.size.values;

const file = () => new Blob(["75NeoUI"], { type: "text/plain" });

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="variant in variants" :key="variant" :class="row">
        <p :class="rowLabel" data-identifier>{{ variant }}</p>
        <div :class="rowItems">
          <DownloadTrigger
            :variant="variant"
            :data="file()"
            file-name="75neo.txt"
            mime-type="text/plain"
          >
            Save
          </DownloadTrigger>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="rowItems">
          <DownloadTrigger
            v-for="color in colors"
            :key="color"
            :color="color"
            :data="file()"
            file-name="75neo.txt"
            mime-type="text/plain"
          >
            Save
          </DownloadTrigger>
        </div>
      </div>

      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <DownloadTrigger :size="size" :data="file()" file-name="75neo.txt" mime-type="text/plain">
            Save
          </DownloadTrigger>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <DownloadTrigger :data="file()" file-name="75neo.txt" mime-type="text/plain" disabled>
            Save
          </DownloadTrigger>
        </div>
      </div>
    </div>
  </div>
</template>
