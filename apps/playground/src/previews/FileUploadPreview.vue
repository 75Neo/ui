<script setup lang="ts">
import { FileUpload } from "@75neo/vue/file-upload";
import { fileUploadSchema } from "@75neo/themes";

const sizes = fileUploadSchema.size.values;
const colors = fileUploadSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-sm";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <FileUpload :size="size" label="Attachment" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div v-for="color in colors" :key="color" :class="row">
        <p :class="rowLabel" data-identifier>{{ color }}</p>
        <div :class="rowItems">
          <FileUpload :color="color" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>described</p>
        <div :class="rowItems">
          <FileUpload
            label="Avatar"
            title="Drop an image here"
            description="PNG or JPG, up to 2 MB"
            accept="image/*"
            :max-file-size="2000000"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>multiple</p>
        <div :class="rowItems">
          <FileUpload :max-files="5" trigger-label="Choose files" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <FileUpload disabled />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>invalid</p>
        <div :class="rowItems">
          <FileUpload invalid />
        </div>
      </div>
    </div>
  </div>
</template>
