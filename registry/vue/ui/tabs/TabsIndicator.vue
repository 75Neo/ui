<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cn } from "cn";
import { tabs } from "@/registry/shared/lib/tabs.styles";

interface TabsIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TabsIndicatorProps>();

const styles = tabs();
</script>

<template>
  <Ark.Indicator :class="cn(styles.indicator(), props.class)" />
</template>
