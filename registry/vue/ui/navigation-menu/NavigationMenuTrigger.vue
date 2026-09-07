<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cn } from "cn";
import { navigationMenu } from "@/registry/shared/lib/navigation-menu.styles";

interface NavigationMenuTriggerProps {
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = defineProps<NavigationMenuTriggerProps>();

defineSlots<{
  leading?: () => unknown;
  default?: () => unknown;
  trailing?: () => unknown;
}>();

const styles = navigationMenu();
</script>

<template>
  <Ark.Trigger :disabled="props.disabled" :class="cn(styles.trigger(), props.class)">
    <span v-if="$slots.leading" :class="styles.triggerLeading()">
      <slot name="leading" />
    </span>

    <slot />

    <span v-if="$slots.trailing" :class="styles.triggerTrailing()">
      <slot name="trailing" />
    </span>
  </Ark.Trigger>
</template>
