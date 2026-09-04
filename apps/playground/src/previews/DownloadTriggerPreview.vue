<script setup lang="ts">
import { downloadTrigger, variantValues } from "@75neo/themes";
import { DownloadTrigger } from "@75neo/vue";
import { Download } from "@lucide/vue";

const sizes = variantValues(downloadTrigger, "size");
const colors = variantValues(downloadTrigger, "color");
const variants = variantValues(downloadTrigger, "variant");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const data = "Hello from 75NeoUI: this file was saved by the DownloadTrigger.";
const fileName = "hello.txt";
const mimeType = "text/plain";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <div>
        <DownloadTrigger :size="size" :data="data" :file-name="fileName" :mime-type="mimeType">
          Download
        </DownloadTrigger>
      </div>
    </div>

    <hr class="border-muted" />

    <div v-for="variant in variants" :key="variant" :class="row">
      <p :class="rowLabel" data-identifier>{{ variant }}</p>
      <div>
        <DownloadTrigger
          :variant="variant"
          :data="data"
          :file-name="fileName"
          :mime-type="mimeType"
          :leading-icon="Download"
        >
          Report
        </DownloadTrigger>
      </div>
    </div>

    <hr class="border-muted" />

    <div v-for="color in colors" :key="color" :class="row">
      <p :class="rowLabel" data-identifier>{{ color }}</p>
      <div>
        <DownloadTrigger
          :color="color"
          variant="soft"
          :data="data"
          :file-name="fileName"
          :mime-type="mimeType"
        >
          {{ color }}
        </DownloadTrigger>
      </div>
    </div>
  </div>
</template>
