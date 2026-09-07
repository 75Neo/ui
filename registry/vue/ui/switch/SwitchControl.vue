<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { cn } from "cn";
import { switchRecipe } from "@/registry/shared/lib/switch.styles";

interface SwitchControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SwitchControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = switchRecipe();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
