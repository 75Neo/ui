<script setup lang="ts">
import type { Component } from "vue";
import { Collapsible as Ark } from "@ark-ui/vue/collapsible";
import { ChevronDown } from "@lucide/vue";
import { type CollapsibleProps, collapsible } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The open state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:open`, with
 * `defaultOpen` as the uncontrolled counterpart Ark's root already takes.
 */
const props = defineProps<
  CollapsibleProps<Component> & {
    class?: unknown;
    defaultOpen?: boolean;
    ids?: { root?: string; content?: string; trigger?: string };
  }
>();

const emit = defineEmits<{
  /** Fired whenever the panel opens or closes. */
  openChange: [details: { open: boolean }];
  /** Fired once the closing animation has finished. */
  exitComplete: [];
}>();

defineSlots<{
  /** The panel's content. */
  default?: () => unknown;
  /** Replaces the trigger's contents. Falls back to `label`. */
  label?: () => unknown;
  /** Replaces the chevron. Falls back to `trailingIcon`. */
  trailingIcon?: () => unknown;
}>();

/*
 * `default: undefined` is load-bearing, and `undefined` in the type argument is what
 * lets it typecheck. `defineModel` declares `open` as a Boolean prop, and Vue casts an
 * absent Boolean prop to `false` unless the declaration carries a default — which would
 * pin every panel to a controlled closed state and leave `defaultOpen` with nothing to
 * do. Ark's own root carries the same defaults.
 */
const open = defineModel<boolean | undefined>("open", { default: undefined });

const theme = useResolvedTheme(
  collapsible,
  "collapsible",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:open="open"
    data-slot="base"
    :class="theme.class.base"
    :default-open="props.defaultOpen"
    :disabled="props.disabled"
    :collapsed-height="props.collapsedHeight"
    :unmount-on-exit="props.unmountOnExit"
    :lazy-mount="props.lazyMount"
    :ids="props.ids"
    @open-change="emit('openChange', $event)"
    @exit-complete="emit('exitComplete')"
  >
    <Ark.Trigger data-slot="trigger" :class="theme.class.trigger">
      <span v-if="props.icon" data-slot="leadingIcon" :class="theme.class.leadingIcon">
        <component :is="props.icon" />
      </span>
      <span data-slot="label" :class="theme.class.label">
        <slot name="label">{{ props.label }}</slot>
      </span>
      <Ark.Indicator data-slot="trailingIcon" :class="theme.class.trailingIcon">
        <slot name="trailingIcon">
          <component :is="props.trailingIcon ?? ChevronDown" />
        </slot>
      </Ark.Indicator>
    </Ark.Trigger>

    <Ark.Content data-slot="content" :class="theme.class.content">
      <div data-slot="body" :class="theme.class.body">
        <slot />
      </div>
    </Ark.Content>
  </Ark.Root>
</template>
