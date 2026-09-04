<script setup lang="ts">
import type { Component } from "vue";
import {
  DownloadTrigger as Ark,
  type DownloadTriggerProps as ArkDownloadTriggerProps,
} from "@ark-ui/vue/download-trigger";
import { type DownloadTriggerProps, downloadTrigger } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The button's text is the default slot, which usually names the file being saved,
 * because a download button names its own file and a string prop would only get in
 * the way.
 */
const props = defineProps<
  DownloadTriggerProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  /** The button's label. */
  default?: () => unknown;
  /** Replaces the icon shown before the label. Falls back to `leadingIcon`. */
  leadingIcon?: () => unknown;
  /** Replaces the icon shown after the label. Falls back to `trailingIcon`. */
  trailingIcon?: () => unknown;
}>();

const theme = useResolvedTheme(
  downloadTrigger,
  "downloadTrigger",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark
    data-slot="base"
    :class="theme.class.base"
    :data="props.data as ArkDownloadTriggerProps['data']"
    :file-name="props.fileName"
    :mime-type="props.mimeType"
    :disabled="props.disabled"
  >
    <span
      v-if="props.leadingIcon != null || $slots.leadingIcon"
      data-slot="leadingIcon"
      :class="theme.class.leadingIcon"
    >
      <slot name="leadingIcon">
        <component :is="props.leadingIcon" />
      </slot>
    </span>
    <span v-if="$slots.default" data-slot="label" :class="theme.class.label">
      <slot />
    </span>
    <span
      v-if="props.trailingIcon != null || $slots.trailingIcon"
      data-slot="trailingIcon"
      :class="theme.class.trailingIcon"
    >
      <slot name="trailingIcon">
        <component :is="props.trailingIcon" />
      </slot>
    </span>
  </Ark>
</template>
