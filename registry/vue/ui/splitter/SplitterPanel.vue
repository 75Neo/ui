<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Splitter as Ark } from "@ark-ui/vue/splitter";
import { cn } from "cn";
import { splitter } from "@/registry/shared/lib/splitter.styles";

interface SplitterPanelProps {
  id: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<SplitterPanelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = splitter();
</script>

<template>
  <Ark.Panel :id="props.id" :class="cn(styles.panel(), props.class)">
    <slot />
  </Ark.Panel>
</template>
