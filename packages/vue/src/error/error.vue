<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { cn, errorDefaults, errorRootClass, type ErrorRootProps } from "@75neo/themes";
import { errorVariantsKey } from "./variants";
import ErrorIcon from "./icon.vue";
import ErrorLinks from "./links.vue";
import ErrorMessage from "./message.vue";
import ErrorStatusCode from "./status-code.vue";
import ErrorStatusMessage from "./status-message.vue";

const props = defineProps<
  ErrorRootProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  /** Links under the message, usually a way back. */
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? errorDefaults.color;
  },
});
provide(errorVariantsKey, resolved);

const rootClass = computed(() => cn(errorRootClass, props.class as string | undefined));
// A server that sends the same string twice renders one line.
const body = computed(() =>
  props.message != null && props.message !== props.statusMessage ? props.message : undefined,
);
</script>

<template>
  <main data-slot="error" :data-color="resolved.color" :class="rootClass">
    <ErrorIcon v-if="props.icon">
      <component :is="props.icon" />
    </ErrorIcon>
    <ErrorStatusCode v-if="props.statusCode != null">{{ props.statusCode }}</ErrorStatusCode>
    <ErrorStatusMessage v-if="props.statusMessage != null">
      {{ props.statusMessage }}
    </ErrorStatusMessage>
    <ErrorMessage v-if="body != null">{{ body }}</ErrorMessage>
    <ErrorLinks v-if="$slots.default">
      <slot />
    </ErrorLinks>
  </main>
</template>
