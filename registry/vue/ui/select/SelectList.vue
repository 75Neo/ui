<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectListProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectListProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = select();
</script>

<template>
  <Ark.List :class="cn(styles.list(), props.class)">
    <slot />
  </Ark.List>
</template>
