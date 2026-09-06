<script setup lang="ts">
import { type Component, computed } from "vue";
import { DownloadTrigger as Ark } from "@ark-ui/vue/download-trigger";
import { cva } from "class-variance-authority";
import {
  cn,
  downloadTriggerBaseCompoundData,
  downloadTriggerDefaults,
  downloadTriggerSizeData,
  type DownloadTriggerProps,
} from "@75neo/themes";

const downloadTriggerBase = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75",
  {
    variants: {
      variant: { solid: "", outline: "", soft: "", ghost: "" },
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: downloadTriggerSizeData.base,
    },
    compoundVariants: downloadTriggerBaseCompoundData,
    defaultVariants: downloadTriggerDefaults,
  },
);

const props = defineProps<
  DownloadTriggerProps<Component> & {
    class?: unknown;
    type?: "button" | "submit" | "reset";
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const baseClass = computed(() =>
  cn(
    downloadTriggerBase({
      variant: props.variant,
      size: props.size,
      color: props.color,
    }),
    props.class as string | undefined,
  ),
);
const resolvedSize = computed(() => props.size ?? downloadTriggerDefaults.size);
const leadingClass = computed(() =>
  cn("shrink-0 [&>svg]:size-full", downloadTriggerSizeData.leadingIcon[resolvedSize.value]),
);
const trailingClass = computed(() =>
  cn("shrink-0 [&>svg]:size-full", downloadTriggerSizeData.trailingIcon[resolvedSize.value]),
);
</script>

<template>
  <Ark.Root
    data-slot="download-trigger"
    :class="baseClass"
    :data-variant="props.variant ?? 'solid'"
    :data-size="resolvedSize"
    :data-color="props.color ?? 'primary'"
    :type="props.type ?? 'button'"
    :data="props.data"
    :file-name="props.fileName"
    :mime-type="props.mimeType"
    :disabled="props.disabled"
  >
    <span
      v-if="props.leadingIcon != null"
      data-slot="download-trigger-leading-icon"
      :class="leadingClass"
    >
      <component :is="props.leadingIcon" />
    </span>
    <span v-if="$slots.default" data-slot="download-trigger-label" :class="cn('truncate')">
      <slot />
    </span>
    <span
      v-if="props.trailingIcon != null"
      data-slot="download-trigger-trailing-icon"
      :class="trailingClass"
    >
      <component :is="props.trailingIcon" />
    </span>
  </Ark.Root>
</template>
