<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SignaturePad as Ark } from "@ark-ui/vue/signature-pad";
import { cn } from "cn";
import { signaturePad } from "@/registry/shared/lib/signature-pad.styles";

interface SignaturePadSegmentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SignaturePadSegmentProps>();

const styles = signaturePad();
</script>

<template>
  <Ark.Segment :class="cn(styles.segment(), props.class)" />
</template>
