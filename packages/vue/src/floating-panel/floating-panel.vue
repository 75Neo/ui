<script setup lang="ts">
import { type Component, provide, reactive } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import {
  ArrowDownLeft as ArrowDownLeftIcon,
  GripVertical as GripVerticalIcon,
  Maximize2 as Maximize2Icon,
  Minus as MinusIcon,
  X as XIcon,
} from "@lucide/vue";
import {
  floatingPanelDefaults,
  floatingPanelResizeAxes,
  type FloatingPanelRootProps,
} from "@75neo/themes";
import { floatingPanelVariantsKey } from "./variants";
import FloatingPanelBody from "./body.vue";
import FloatingPanelCloseTrigger from "./close-trigger.vue";
import FloatingPanelContent from "./content.vue";
import FloatingPanelControl from "./control.vue";
import FloatingPanelDragTrigger from "./drag-trigger.vue";
import FloatingPanelHeader from "./header.vue";
import FloatingPanelResizeTrigger from "./resize-trigger.vue";
import FloatingPanelStageTrigger from "./stage-trigger.vue";
import FloatingPanelTitle from "./title.vue";

/*
 * `draggable`, `resizable` and `close` default to on, so each is declared: without
 * the declaration Vue casts an absent boolean to `false` and the grip, the handles
 * and the cross vanish on a bare panel.
 */
const props = withDefaults(
  defineProps<
    FloatingPanelRootProps<Component> & {
      class?: unknown;
    }
  >(),
  { draggable: true, resizable: true, close: true },
);

const emit = defineEmits<{
  /** Fired when the panel opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** The element that opens the panel. It becomes the trigger. */
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:open` absent. Without it the declared
 * prop would reach Ark as an explicit `false` and pin the panel shut, which would
 * leave `defaultOpen` with nothing to do.
 */
const open = defineModel<boolean | undefined>("open", { default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? floatingPanelDefaults.size;
  },
});
provide(floatingPanelVariantsKey, resolved);
</script>

<template>
  <Ark.Root
    data-slot="floating-panel"
    :data-size="resolved.size"
    v-model:open="open"
    @open-change="emit('openChange', $event)"
    :draggable="props.draggable"
    :resizable="props.resizable"
    :disabled="props.disabled"
    :close-on-escape="props.closeOnEscape"
    :strategy="props.strategy"
    :default-position="props.defaultPosition"
    :default-size="props.defaultSize"
    :size="props.panelSize"
    :min-size="props.minSize"
    :max-size="props.maxSize"
    :persist-rect="props.persistRect"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
  >
    <Ark.Trigger v-if="$slots.default" as-child>
      <slot />
    </Ark.Trigger>
    <FloatingPanelContent :portal="props.portal" :class="props.class as string | undefined">
      <component :is="props.header" v-if="props.header !== undefined" />
      <template v-else>
        <FloatingPanelDragTrigger>
          <FloatingPanelHeader>
            <FloatingPanelTitle v-if="props.title != null">
              <component :is="props.dragIcon ?? GripVerticalIcon" />
              {{ props.title }}
            </FloatingPanelTitle>
            <FloatingPanelControl>
              <FloatingPanelStageTrigger
                v-for="stage in props.stages ?? ['minimized', 'maximized', 'default']"
                :key="stage"
                :stage="stage"
              >
                <component
                  :is="
                    stage === 'minimized'
                      ? (props.minimizeIcon ?? MinusIcon)
                      : stage === 'maximized'
                        ? (props.maximizeIcon ?? Maximize2Icon)
                        : (props.restoreIcon ?? ArrowDownLeftIcon)
                  "
                />
              </FloatingPanelStageTrigger>
              <FloatingPanelCloseTrigger v-if="props.close" aria-label="Close panel">
                <component :is="props.closeIcon ?? XIcon" />
              </FloatingPanelCloseTrigger>
            </FloatingPanelControl>
          </FloatingPanelHeader>
        </FloatingPanelDragTrigger>
      </template>
      <FloatingPanelBody v-if="props.body != null">
        <component :is="props.body" />
      </FloatingPanelBody>
      <template v-if="props.resizable">
        <FloatingPanelResizeTrigger
          v-for="axis in floatingPanelResizeAxes"
          :key="axis"
          :axis="axis"
        />
      </template>
    </FloatingPanelContent>
  </Ark.Root>
</template>
