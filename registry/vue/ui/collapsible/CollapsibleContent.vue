<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Collapsible as Ark } from "@ark-ui/vue/collapsible";
import { cn } from "cn";
import { collapsibleStyles as styles } from "@/registry/shared/lib/collapsible.styles";

interface CollapsibleContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CollapsibleContentProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
