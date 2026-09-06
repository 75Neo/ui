<script setup lang="ts">
import { Clipboard } from "@75neo/vue/clipboard";

const props = defineProps<{
  value: string;
}>();
</script>

<template>
  <Clipboard :value="props.value" />
</template>
