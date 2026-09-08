<script setup lang="ts">
import { ref } from "vue";
import {
  SignaturePad,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadSegment,
} from "@/components/vue";

const value = ref("");

const store = async (details: { getDataUrl: (type: string) => Promise<string> }) => {
  value.value = await details.getDataUrl("image/png");
};
</script>

<template>
  <div class="max-w-md">
    <SignaturePad @draw-end="store">
      <SignaturePadLabel>Sign here</SignaturePadLabel>
      <SignaturePadControl>
        <SignaturePadSegment />
        <SignaturePadGuide />
      </SignaturePadControl>
      <SignaturePadClearTrigger>Clear</SignaturePadClearTrigger>
      <SignaturePadHiddenInput :value="value" />
    </SignaturePad>
  </div>
</template>
