<script setup lang="ts">
import { type Component, computed, onMounted, ref } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { GripVertical, Maximize2, Minimize2, Minus, X } from "@lucide/vue";
import {
  floatingPanel,
  floatingPanelResizeAxes,
  type FloatingPanelPosition,
  type FloatingPanelProps,
  type FloatingPanelSize,
  type FloatingPanelStage,
} from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The open state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:open`, with
 * `defaultOpen` as the uncontrolled counterpart Ark's root already takes. The
 * position and the pixel size stay one-way — `position` and `panelSize` in, change
 * events out — because only the open state is a Boolean model Ark names the same on
 * both sides.
 */
const props = withDefaults(
  defineProps<
    FloatingPanelProps<Component> & {
      class?: unknown;
      defaultOpen?: boolean;
      position?: FloatingPanelPosition;
      ids?: {
        trigger?: string;
        positioner?: string;
        content?: string;
        title?: string;
        header?: string;
      };
    }
  >(),
  /*
   * Every one of these defaults on, and a type-based `defineProps` declares them as
   * Boolean props, so Vue casts an absent one to `false`. Left unnamed, `close`
   * would render no button and `portal` would leave the panel inside whatever
   * overflow the trigger sits in.
   */
  { close: true, portal: true },
);

const emit = defineEmits<{
  /** Fired whenever the panel opens or closes. */
  openChange: [details: { open: boolean }];
  /** Fired while the panel is dragged. */
  positionChange: [details: { position: FloatingPanelPosition }];
  /** Fired while the panel is resized. */
  sizeChange: [details: { size: FloatingPanelSize }];
  /** Fired whenever the panel minimizes, maximizes or restores. */
  stageChange: [details: { stage: FloatingPanelStage }];
  /** Fired once the closing animation has finished. */
  exitComplete: [];
}>();

defineSlots<{
  /** The element that opens the panel. It becomes the trigger and carries Ark's props. */
  default?: () => unknown;
  /** Replaces the whole header, including the grip, the title and the controls. */
  header?: () => unknown;
  /** Overrides the `title` prop. */
  title?: () => unknown;
  /** Replaces the row of window controls at the end of the header. */
  control?: () => unknown;
  /** The panel's main content. */
  body?: () => unknown;
}>();

const open = defineModel<boolean | undefined>("open", { default: undefined });

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the panel is left in place until the component is mounted —
 * otherwise the first client render disagrees with the server's and the page logs a
 * hydration mismatch. Dialog, Popover and Tooltip do the same.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

/* `withDefaults` takes no array literal, so the default stages live here instead. */
const stages = computed<FloatingPanelStage[]>(
  () => props.stages ?? ["minimized", "maximized", "default"],
);

const stageLabel = (stage: FloatingPanelStage) =>
  stage === "minimized"
    ? "Minimize panel"
    : stage === "maximized"
      ? "Maximize panel"
      : "Restore panel";

const stageIcon = (stage: FloatingPanelStage) =>
  stage === "minimized"
    ? (props.minimizeIcon ?? Minus)
    : stage === "maximized"
      ? (props.maximizeIcon ?? Maximize2)
      : (props.restoreIcon ?? Minimize2);

const theme = useResolvedTheme(
  floatingPanel,
  "floatingPanel",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :position="props.position"
    :default-position="props.defaultPosition"
    :size="props.panelSize"
    :default-size="props.defaultSize"
    :min-size="props.minSize"
    :max-size="props.maxSize"
    :draggable="props.draggable"
    :resizable="props.resizable"
    :disabled="props.disabled"
    :close-on-escape="props.closeOnEscape"
    :strategy="props.strategy"
    :persist-rect="props.persistRect"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    :ids="props.ids"
    @open-change="emit('openChange', $event)"
    @position-change="emit('positionChange', $event)"
    @size-change="emit('sizeChange', $event)"
    @stage-change="emit('stageChange', $event)"
    @exit-complete="emit('exitComplete')"
  >
    <Ark.Trigger v-if="$slots.default" as-child>
      <slot />
    </Ark.Trigger>

    <Teleport to="body" :disabled="!props.portal || !mounted">
      <Ark.Positioner data-slot="positioner" :class="theme.class.positioner">
        <Ark.Content data-slot="base" :class="theme.class.base">
          <slot name="header">
            <Ark.DragTrigger data-slot="dragTrigger" :class="theme.class.dragTrigger">
              <Ark.Header data-slot="header" :class="theme.class.header">
                <span data-slot="dragIcon" :class="theme.class.dragIcon">
                  <component :is="props.dragIcon ?? GripVertical" />
                </span>
                <Ark.Title
                  v-if="props.title || $slots.title"
                  data-slot="title"
                  :class="theme.class.title"
                >
                  <slot name="title">{{ props.title }}</slot>
                </Ark.Title>
                <slot name="control">
                  <Ark.Control data-slot="control" :class="theme.class.control">
                    <Ark.StageTrigger
                      v-for="stage in stages"
                      :key="stage"
                      :stage="stage"
                      :aria-label="stageLabel(stage)"
                      data-slot="stageTrigger"
                      :class="theme.class.stageTrigger"
                    >
                      <component :is="stageIcon(stage)" />
                    </Ark.StageTrigger>
                    <Ark.CloseTrigger
                      v-if="props.close"
                      aria-label="Close panel"
                      data-slot="closeTrigger"
                      :class="theme.class.closeTrigger"
                    >
                      <component :is="props.closeIcon ?? X" />
                    </Ark.CloseTrigger>
                  </Ark.Control>
                </slot>
              </Ark.Header>
            </Ark.DragTrigger>
          </slot>

          <Ark.Body v-if="$slots.body" data-slot="body" :class="theme.class.body">
            <slot name="body" />
          </Ark.Body>

          <template v-if="props.resizable !== false">
            <Ark.ResizeTrigger
              v-for="axis in floatingPanelResizeAxes"
              :key="axis"
              :axis="axis"
              :aria-label="`Resize panel ${axis}`"
              data-slot="resizeTrigger"
              :class="theme.class.resizeTrigger"
            />
          </template>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>
