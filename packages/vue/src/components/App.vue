<script setup lang="ts">
import { computed } from "vue";
import { LocaleProvider } from "@ark-ui/vue/locale";
import { resolveTheme } from "@75neo/core";
import { app, type AppProps, localeDirection } from "@75neo/themes";
import { provideTheme } from "../composables/theme";

/**
 * The element an application is wrapped in: a theme, a locale, and the reading
 * direction every `rtl:` utility in the library depends on.
 *
 * @remarks
 * `provideTheme` hands back the folded config as well as publishing it, which is what
 * lets an App restyle itself through its own `theme` prop. Injecting it instead would
 * have reached the provider above this one, because Vue's `inject` never sees a
 * component's own `provide`.
 */
const props = withDefaults(defineProps<AppProps & { class?: unknown }>(), {
  locale: "en-US",
});

defineSlots<{
  /** Everything the application renders. */
  default?: () => unknown;
}>();

const config = provideTheme(() => props.theme ?? {});

const theme = computed(() =>
  resolveTheme(app, config.value.app, props, props.class as string | undefined),
);
</script>

<template>
  <LocaleProvider :locale="props.locale">
    <div
      :dir="props.dir ?? localeDirection(props.locale)"
      data-slot="base"
      :class="theme.class.base"
    >
      <slot />
    </div>
  </LocaleProvider>
</template>
