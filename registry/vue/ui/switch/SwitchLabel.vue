<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { cn } from "cn";
import { switchStyles as styles } from "@/registry/shared/lib/switch.styles";

interface SwitchLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SwitchLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
