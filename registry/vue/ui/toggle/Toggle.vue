<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Toggle as Ark } from "@ark-ui/vue/toggle";
import { cn } from "cn";
import { toggle, type ToggleSize, type Intent } from "@/registry/shared/lib/toggle.styles";

interface ToggleProps {
  defaultPressed?: boolean;
  disabled?: boolean;
  size?: ToggleSize;
  color?: Intent;
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

const styles = computed(() => toggle({ color: props.color }));
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
