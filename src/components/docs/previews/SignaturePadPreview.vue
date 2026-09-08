<script setup lang="ts">
import SignaturePad from "@/registry/vue/ui/signature-pad/SignaturePad.vue";
import SignaturePadClearTrigger from "@/registry/vue/ui/signature-pad/SignaturePadClearTrigger.vue";
import SignaturePadControl from "@/registry/vue/ui/signature-pad/SignaturePadControl.vue";
import SignaturePadGuide from "@/registry/vue/ui/signature-pad/SignaturePadGuide.vue";
import SignaturePadHiddenInput from "@/registry/vue/ui/signature-pad/SignaturePadHiddenInput.vue";
import SignaturePadLabel from "@/registry/vue/ui/signature-pad/SignaturePadLabel.vue";
import SignaturePadSegment from "@/registry/vue/ui/signature-pad/SignaturePadSegment.vue";
</script>

<template>
  <div class="max-w-md">
    <SignaturePad>
      <SignaturePadLabel>Sign here</SignaturePadLabel>
      <SignaturePadControl>
        <SignaturePadSegment />
        <SignaturePadGuide />
      </SignaturePadControl>
      <SignaturePadClearTrigger>Clear</SignaturePadClearTrigger>
      <SignaturePadHiddenInput />
    </SignaturePad>
  </div>
</template>
