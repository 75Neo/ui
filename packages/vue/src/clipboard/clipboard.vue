<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { clipboardDefaults, cn, type ClipboardIds, type ClipboardRootProps } from "@75neo/themes";
import { clipboardVariantsKey } from "./variants";
import ClipboardControl from "./control.vue";
import ClipboardInput from "./input.vue";
import ClipboardLabel from "./label.vue";
import ClipboardTrigger from "./trigger.vue";

/**
 * Ark spells the copied text `modelValue` here and `value` in React, so the shared
 * contract's `value` is mapped onto it below. It stays one-way: the field is
 * read-only, so nothing inside the component ever writes a new value back.
 */
const props = defineProps<
  Omit<ClipboardRootProps<Component>, "ids"> & {
    class?: unknown;
    ids?: ClipboardIds;
  }
>();

const emit = defineEmits<{
  /** Fired when the value is copied, and again when the copied state times out. */
  statusChange: [details: { copied: boolean }];
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? clipboardDefaults.color;
  },
  get size() {
    return props.size ?? clipboardDefaults.size;
  },
});
provide(clipboardVariantsKey, resolved);

const rootClass = computed(() =>
  cn("flex min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    data-slot="clipboard"
    :class="rootClass"
    :model-value="props.value"
    :timeout="props.timeout"
    :ids="props.ids"
    :data-color="resolved.color"
    :data-size="resolved.size"
    @status-change="emit('statusChange', $event)"
  >
    <ClipboardLabel v-if="props.label != null">{{ props.label }}</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput />
      <ClipboardTrigger :copy-icon="props.copyIcon" :copied-icon="props.copiedIcon" />
    </ClipboardControl>
  </Ark.Root>
</template>
