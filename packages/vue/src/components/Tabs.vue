<script setup lang="ts">
import type { Component } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { type TabsItem, type TabsProps, tabs } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The selected value lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model`, with
 * `defaultValue` as the uncontrolled counterpart Ark's root already takes.
 */
const props = defineProps<
  TabsProps<Component> & {
    class?: unknown;
    defaultValue?: string;
    /*
     * `trigger` and `content` are functions of a tab's value rather than plain strings,
     * because a Tabs renders one of each per item.
     */
    ids?: {
      root?: string;
      list?: string;
      indicator?: string;
      trigger?: (value: string) => string;
      content?: (value: string) => string;
    };
  }
>();

const emit = defineEmits<{
  /** Fired whenever a different tab is selected. */
  valueChange: [details: { value: string }];
}>();

defineSlots<{
  /** Replace a tab's trigger text with arbitrary markup. Falls back to `item.label`. */
  label?: (props: { item: TabsItem<Component> }) => unknown;
  /** Replace a tab's panel with arbitrary markup. Falls back to `item.content`. */
  content?: (props: { item: TabsItem<Component> }) => unknown;
}>();

/*
 * A string model needs no `default: undefined`: the cast that catches Boolean props
 * leaves everything else alone. Ark still wants `undefined` rather than an empty
 * string, which is what an unset model gives it.
 */
const value = defineModel<string | undefined>({ default: undefined });

const theme = useResolvedTheme(
  tabs,
  "tabs",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :activation-mode="props.activationMode"
    :orientation="props.orientation"
    :unmount-on-exit="props.unmountOnExit"
    :lazy-mount="props.lazyMount"
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
  >
    <Ark.List data-slot="list" :class="theme.class.list">
      <Ark.Trigger
        v-for="item in props.items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        data-slot="trigger"
        :class="theme.class.trigger"
      >
        <span v-if="item.icon" data-slot="leadingIcon" :class="theme.class.leadingIcon">
          <component :is="item.icon" />
        </span>
        <span data-slot="label" :class="theme.class.label">
          <slot name="label" :item="item">{{ item.label }}</slot>
        </span>
      </Ark.Trigger>

      <!-- Last, so it is measured against a list that has finished laying out. -->
      <Ark.Indicator data-slot="indicator" :class="theme.class.indicator" />
    </Ark.List>

    <Ark.Content
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      data-slot="content"
      :class="theme.class.content"
    >
      <slot name="content" :item="item">{{ item.content }}</slot>
    </Ark.Content>
  </Ark.Root>
</template>
