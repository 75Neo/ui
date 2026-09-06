<script setup lang="ts">
import { computed } from "vue";
import { LocaleProvider as ArkLocaleProvider } from "@ark-ui/vue/locale";
import {
  cn,
  localeDirection,
  localeProviderDefaults,
  type LocaleProviderRootProps,
} from "@75neo/themes";

const props = withDefaults(
  defineProps<
    LocaleProviderRootProps & {
      class?: unknown;
    }
  >(),
  { locale: localeProviderDefaults.locale },
);

defineSlots<{
  /** Everything the application renders. */
  default?: () => unknown;
}>();

const direction = computed(() => props.dir ?? localeDirection(props.locale));
</script>

<template>
  <ArkLocaleProvider :locale="props.locale">
    <div
      :dir="direction"
      data-slot="locale-provider"
      :class="cn('isolate', props.class as string | undefined)"
    >
      <slot />
    </div>
  </ArkLocaleProvider>
</template>
