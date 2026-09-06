<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Splitter as Ark } from "@ark-ui/vue/splitter";
import { cn, splitterDefaults, type SplitterRootProps } from "@75neo/themes";
import { splitterVariantsKey } from "./variants";
import SplitterPanel from "./panel.vue";
import SplitterResizeTrigger from "./resize-trigger.vue";

const props = defineProps<
  SplitterRootProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? splitterDefaults.size;
  },
});
provide(splitterVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "group/splitter flex min-h-0 min-w-0 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col",
    props.class as string | undefined,
  ),
);
const panels = computed(() => props.panels ?? []);
</script>

<template>
  <Ark.Root
    :orientation="props.orientation"
    :panels="panels"
    :default-size="props.defaultSizes"
    :size="props.sizes"
    :keyboard-resize-by="props.keyboardResizeBy"
    data-slot="splitter"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <template v-for="(panel, index) in panels" :key="panel.id">
        <SplitterResizeTrigger
          v-if="index > 0"
          :id="`${panels[index - 1].id}:${panel.id}`"
          :disabled="panel.disabled ?? panels[index - 1].disabled"
        />
        <SplitterPanel :id="panel.id">{{ panel.content }}</SplitterPanel>
      </template>
    </template>
  </Ark.Root>
</template>
