<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Splitter as Ark } from "@ark-ui/vue/splitter";
import type { SplitterResizeTriggerProps as ArkResizeTriggerProps } from "@ark-ui/vue/splitter";
import { cn } from "cn";
import { splitterStyles as styles } from "@/registry/shared/lib/splitter.styles";

interface SplitterResizeTriggerProps {
  id: ArkResizeTriggerProps["id"];
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SplitterResizeTriggerProps>(), {
  disabled: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ResizeTrigger
    :id="props.id"
    :disabled="props.disabled"
    :class="cn(styles.resizeTrigger(), props.class)"
  >
    <slot />
  </Ark.ResizeTrigger>
</template>
