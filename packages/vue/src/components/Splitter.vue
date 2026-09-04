<script setup lang="ts">
import { computed } from "vue";
import { Splitter as Ark } from "@ark-ui/vue/splitter";
import { splitter, type SplitterPanel, type SplitterProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

const props = defineProps<
  SplitterProps & {
    class?: unknown;
    ids?: {
      root?: string;
      resizeTrigger?: (id: string) => string;
      label?: (id: string) => string;
      panel?: (id: string | number) => string;
    };
  }
>();

const emit = defineEmits<{
  /** Fired while a handle is dragged. */
  resize: [details: { size: number[] }];
  /** Fired when a handle drag starts. */
  resizeStart: [];
  /** Fired when a handle drag ends. */
  resizeEnd: [details: { size: number[] }];
  /** Fired when a panel collapses. */
  collapse: [details: { panelId: string }];
  /** Fired when a panel expands. */
  expand: [details: { panelId: string }];
}>();

defineSlots<{
  /** Replace a panel's content with arbitrary markup. Falls back to `panel.content`. */
  panel?: (props: { panel: SplitterPanel }) => unknown;
}>();

/*
 * Ark's panels carry constraints only; the content and the disabled flag are this
 * library's own, so they are stripped before the array reaches the root. A handle is
 * disabled when either panel it touches is, and named off both of them.
 */
const panelData = computed(() =>
  props.panels.map(({ id, minSize, maxSize, collapsible, collapsedSize }) => ({
    id,
    minSize,
    maxSize,
    collapsible,
    collapsedSize,
  })),
);

const handles = computed<
  { key: string; id: `${string}:${string}`; label: string; disabled: boolean | undefined }[]
>(() =>
  props.panels.slice(0, -1).map((panel, index) => {
    const peer = props.panels[index + 1];
    return {
      key: `handle:${panel.id}:${peer.id}`,
      id: `${panel.id}:${peer.id}`,
      label: `Resize ${panel.id} and ${peer.id}`,
      disabled: panel.disabled || peer.disabled,
    };
  }),
);

const theme = useResolvedTheme(
  splitter,
  "splitter",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    data-slot="base"
    :class="theme.class.base"
    :panels="panelData"
    :orientation="props.orientation"
    :default-size="props.defaultSize"
    :size="props.size"
    :keyboard-resize-by="props.keyboardResizeBy"
    :ids="props.ids"
    @resize="emit('resize', $event)"
    @resize-start="emit('resizeStart')"
    @resize-end="emit('resizeEnd', $event)"
    @collapse="emit('collapse', $event)"
    @expand="emit('expand', $event)"
  >
    <template v-for="(panel, index) in props.panels" :key="panel.id">
      <Ark.Panel :id="panel.id" data-slot="panel" :class="theme.class.panel">
        <slot name="panel" :panel="panel">{{ panel.content }}</slot>
      </Ark.Panel>
      <Ark.ResizeTrigger
        v-if="index < handles.length"
        :id="handles[index].id"
        :aria-label="handles[index].label"
        :disabled="handles[index].disabled"
        data-slot="handle"
        :class="theme.class.handle"
      >
        <Ark.ResizeTriggerIndicator
          data-slot="handleIndicator"
          :class="theme.class.handleIndicator"
        />
      </Ark.ResizeTrigger>
    </template>
  </Ark.Root>
</template>
