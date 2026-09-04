<script setup lang="ts">
import { ref } from "vue";
import { fileUpload, variantValues } from "@75neo/themes";
import { FileUpload } from "@75neo/vue";

const sizes = variantValues(fileUpload, "size");
const colors = variantValues(fileUpload, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const held = ref<File[]>([]);
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <FileUpload :size="size" description="Up to 5 MB" :max-file-size="5_000_000" />
    </div>

    <hr class="border-muted" />

    <!--
      The accent shows on focus and while a file is over the window, so tab to a dropzone
      or drag something onto it.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <FileUpload :color="accent" size="sm" title="Drop it here" />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <FileUpload
        label="Images only"
        accept="image/*"
        :max-files="4"
        title="Drop up to four pictures"
        description="PNG, JPG or WebP"
      />
      <FileUpload
        label="No thumbnails"
        accept="image/*"
        :max-files="4"
        :preview="false"
        title="The rows stay plain"
      />
      <FileUpload label="One document" accept=".pdf,.docx" title="Drop a document" />
      <FileUpload label="Disabled" disabled title="Not today" />
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the value is `File[]`, which is what a form body wants. -->
    <div class="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-start @lg:gap-6">
      <FileUpload v-model="held" label="Controlled" :max-files="5" />
      <output class="font-mono text-sm text-toned">
        {{ held.length === 0 ? "nothing yet" : `${held.length} file(s)` }}
      </output>
    </div>
  </div>
</template>
