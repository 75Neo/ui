<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toggle as Ark } from "@ark-ui/vue/toggle";
import { cn } from "cn";
import { toggle, type ToggleSize } from "@/registry/shared/lib/toggle.styles";

interface ToggleProps {
  defaultPressed?: boolean;
  disabled?: boolean;
  size?: ToggleSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ToggleProps>(), {
  defaultPressed: undefined,
  disabled: undefined,
  size: "md",
});

const pressed = defineModel<boolean>("pressed", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

const styles = toggle();
</script>

<template>
  <Ark.Root
    v-model:pressed="pressed"
    :default-pressed="props.defaultPressed"
    :disabled="props.disabled"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
