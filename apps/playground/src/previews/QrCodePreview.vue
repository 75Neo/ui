<script setup lang="ts">
import { QrCode, QrCodeDownloadTrigger, QrCodeFrame, QrCodeOverlay } from "@75neo/vue/qr-code";
import { qrCodeSchema } from "@75neo/themes";

const sizes = qrCodeSchema.size.values;
const value = "https://github.com/75Neo/ui";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-4";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>sizes</p>
        <div :class="rowItems">
          <QrCode v-for="size in sizes" :key="size" :size="size" :default-value="value" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>overlay</p>
        <div :class="rowItems">
          <QrCode :default-value="value">
            <QrCodeFrame>
              <QrCodeOverlay>
                <img src="/favicon.svg" alt="" />
              </QrCodeOverlay>
            </QrCodeFrame>
          </QrCode>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>download</p>
        <div :class="rowItems">
          <QrCode :default-value="value">
            <QrCodeFrame />
            <QrCodeDownloadTrigger file-name="75neo.png" class="ms-3 self-center">
              Download
            </QrCodeDownloadTrigger>
          </QrCode>
        </div>
      </div>
    </div>
  </div>
</template>
