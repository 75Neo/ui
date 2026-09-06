<script setup lang="ts">
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();
</script>

<template>
  <Ark.CircleTrack
    data-slot="progress-circle-track"
    :class="cn('stroke-default', props.class as string | undefined)"
  />
</template>
