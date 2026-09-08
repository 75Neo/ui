<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Collapsible as Ark } from "@ark-ui/vue/collapsible";
import { cn } from "cn";
import { collapsible } from "@/registry/shared/lib/collapsible.styles";

interface CollapsibleProps {
  defaultOpen?: boolean;
  disabled?: boolean;
  lazyMount?: boolean;
  unmountOnExit?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<CollapsibleProps>(), {
  defaultOpen: undefined,
  disabled: undefined,
  lazyMount: undefined,
  unmountOnExit: undefined,
});

const open = defineModel<boolean>("open");

defineSlots<{
  default?: () => unknown;
}>();

const styles = collapsible();
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :disabled="props.disabled"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
