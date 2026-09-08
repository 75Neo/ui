<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { cn } from "cn";
import { switchStyles as styles } from "@/registry/shared/lib/switch.styles";

interface SwitchControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SwitchControlProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
