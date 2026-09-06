<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { QrCode as Ark } from "@ark-ui/vue/qr-code";
import { cva } from "class-variance-authority";
import { cn, qrCodeDefaults, qrCodeSizeData, type QrCodeRootProps } from "@75neo/themes";
import { qrCodeVariantsKey } from "./variants";
import QrCodeFrame from "./frame.vue";

const qrCodeRoot = cva("inline-flex w-fit rounded-xl bg-default ring ring-default ring-inset", {
  variants: { size: qrCodeSizeData.root },
  defaultVariants: qrCodeDefaults,
});

const props = defineProps<
  QrCodeRootProps & {
    class?: unknown;
  }
>();

const value = defineModel<string | undefined>({ default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? qrCodeDefaults.size;
  },
});
provide(qrCodeVariantsKey, resolved);

const rootClass = computed(() => cn(qrCodeRoot(resolved), props.class as string | undefined));
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :pixel-size="props.pixelSize"
    data-slot="qr-code"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <QrCodeFrame v-else />
  </Ark.Root>
</template>
