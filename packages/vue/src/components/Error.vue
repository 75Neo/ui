<script setup lang="ts">
import { computed, type Component } from "vue";
import { error, type ErrorProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The page shown when there is nothing else to show: a status, a headline, a sentence,
 * and whatever way out the caller offers.
 *
 * @remarks
 * Renders a `main`, because on an error page this is the page. A message identical to
 * the status message is dropped rather than printed twice, which is what a server that
 * sends both fields the same way produces.
 */
const props = defineProps<ErrorProps<Component> & { class?: unknown }>();

defineSlots<{
  /** Whatever should follow the message, usually a button back to somewhere useful. */
  default?: () => unknown;
}>();

const body = computed(() =>
  props.message != null && props.message !== props.statusMessage ? props.message : undefined,
);

const theme = useResolvedTheme(
  error,
  "error",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <main data-slot="base" :class="theme.class.base">
    <div v-if="props.icon" data-slot="leading" :class="theme.class.leading">
      <span data-slot="leadingIcon" :class="theme.class.leadingIcon">
        <component :is="props.icon" />
      </span>
    </div>

    <p v-if="props.statusCode != null" data-slot="statusCode" :class="theme.class.statusCode">
      {{ props.statusCode }}
    </p>

    <h1
      v-if="props.statusMessage != null"
      data-slot="statusMessage"
      :class="theme.class.statusMessage"
    >
      {{ props.statusMessage }}
    </h1>

    <p v-if="body != null" data-slot="message" :class="theme.class.message">
      {{ body }}
    </p>

    <div v-if="$slots.default" data-slot="links" :class="theme.class.links">
      <slot />
    </div>
  </main>
</template>
