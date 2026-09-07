<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cn } from "cn";
import { toc } from "@/registry/shared/lib/toc.styles";

interface TocIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TocIndicatorProps>();

const styles = toc();
</script>

<template>
  <Ark.Indicator as-child>
    <li aria-hidden="true" :class="cn(styles.indicator(), props.class)" />
  </Ark.Indicator>
</template>
