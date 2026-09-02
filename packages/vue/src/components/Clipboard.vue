<script setup lang="ts">
import type { Component } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { Check, Copy } from "@lucide/vue";
import { type ClipboardProps, clipboard } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * Ark spells the copied text `modelValue` here and `value` in React, so the shared
 * contract's `value` is mapped onto it below. It stays one-way: the field is read-only,
 * so nothing inside the component ever writes a new value back.
 */
const props = defineProps<
  ClipboardProps<Component> & {
    class?: unknown;
    ids?: { root?: string; input?: string; label?: string };
  }
>();

const emit = defineEmits<{
  /** Fired when the value is copied, and again when the copied state times out. */
  statusChange: [details: { copied: boolean }];
}>();

defineSlots<{
  /** Replaces the copy icon. Falls back to `copyIcon`. */
  copyIcon?: () => unknown;
  /** Replaces the icon shown just after a copy. Falls back to `copiedIcon`. */
  copiedIcon?: () => unknown;
}>();

const theme = useResolvedTheme(
  clipboard,
  "clipboard",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    data-slot="base"
    :class="theme.class.base"
    :model-value="props.value"
    :timeout="props.timeout"
    :ids="props.ids"
    @status-change="emit('statusChange', $event)"
  >
    <Ark.Label v-if="props.label != null" data-slot="label" :class="theme.class.label">
      {{ props.label }}
    </Ark.Label>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <Ark.Input data-slot="input" :class="theme.class.input" />
      <Ark.Trigger data-slot="trigger" :class="theme.class.trigger">
        <Ark.Indicator data-slot="indicator" :class="theme.class.indicator">
          <template #copied>
            <slot name="copiedIcon">
              <component :is="props.copiedIcon ?? Check" />
            </slot>
          </template>
          <slot name="copyIcon">
            <component :is="props.copyIcon ?? Copy" />
          </slot>
        </Ark.Indicator>
      </Ark.Trigger>
    </Ark.Control>
  </Ark.Root>
</template>
