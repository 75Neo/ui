<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Splitter as Ark } from "@ark-ui/vue/splitter";
import { cn } from "cn";
import { splitter } from "@/registry/shared/lib/splitter.styles";

interface SplitterResizeTriggerIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SplitterResizeTriggerIndicatorProps>();

const styles = splitter();
</script>

<template>
  <Ark.ResizeTriggerIndicator :class="cn(styles.resizeTriggerIndicator(), props.class)" />
</template>
