<script setup lang="ts">
import { QrCode as Ark, type QrCodeGenerateOptions } from "@ark-ui/vue/qr-code";
import { qrCode, type QrCodeProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

const model = defineModel<string>();

const props = defineProps<
  QrCodeProps & {
    class?: unknown;
    encoding?: QrCodeGenerateOptions;
    ids?: {
      root?: string;
      frame?: string;
      overlay?: string;
    };
  }
>();

const emit = defineEmits<{
  /** Fired when the encoded string changes. */
  valueChange: [details: { value: string }];
}>();

const theme = useResolvedTheme(
  qrCode,
  "qrCode",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    data-slot="base"
    :class="theme.class.base"
    v-model="model"
    :default-value="props.defaultValue"
    :pixel-size="props.pixelSize"
    :encoding="props.encoding"
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
  >
    <Ark.Frame data-slot="frame" :class="theme.class.frame">
      <Ark.Pattern />
    </Ark.Frame>
  </Ark.Root>
</template>
