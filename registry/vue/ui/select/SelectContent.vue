<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = select();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
