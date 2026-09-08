<script setup lang="ts">
import { SignaturePad as Ark } from "@ark-ui/vue/signature-pad";

interface SignaturePadHiddenInputProps {
  value: string;
}

const props = defineProps<SignaturePadHiddenInputProps>();
</script>

<template>
  <Ark.HiddenInput :value="props.value" />
</template>
