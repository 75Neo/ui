<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SignaturePad as Ark } from "@ark-ui/vue/signature-pad";
import { cn } from "cn";
import { signaturePadStyles as styles } from "@/registry/shared/lib/signature-pad.styles";

interface SignaturePadGuideProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SignaturePadGuideProps>();
</script>

<template>
  <Ark.Guide :class="cn(styles.guide(), props.class)" />
</template>
