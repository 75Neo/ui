<script setup lang="ts">
import type { Component } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { ChevronDown } from "@lucide/vue";
import { type AccordionItem, type AccordionProps, accordion } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

const props = defineProps<
  AccordionProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  /** Replace an item's heading with arbitrary markup. Falls back to `item.label`. */
  label?: (props: { item: AccordionItem<Component> }) => unknown;
  /** Replace an item's body with arbitrary markup. Falls back to `item.content`. */
  content?: (props: { item: AccordionItem<Component> }) => unknown;
}>();

const theme = useResolvedTheme(
  accordion,
  "accordion",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    data-slot="base"
    :class="theme.class.base"
    :multiple="props.multiple"
    :collapsible="props.collapsible"
    :disabled="props.disabled"
    :orientation="props.orientation"
  >
    <Ark.Item
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      data-slot="item"
      :class="theme.class.item"
    >
      <h3 data-slot="header" :class="theme.class.header">
        <Ark.ItemTrigger data-slot="trigger" :class="theme.class.trigger">
          <span v-if="item.icon" data-slot="leadingIcon" :class="theme.class.leadingIcon">
            <component :is="item.icon" />
          </span>
          <span data-slot="label" :class="theme.class.label">
            <slot name="label" :item="item">{{ item.label }}</slot>
          </span>
          <Ark.ItemIndicator data-slot="trailingIcon" :class="theme.class.trailingIcon">
            <component :is="props.trailingIcon ?? ChevronDown" />
          </Ark.ItemIndicator>
        </Ark.ItemTrigger>
      </h3>
      <Ark.ItemContent data-slot="content" :class="theme.class.content">
        <div data-slot="body" :class="theme.class.body">
          <slot name="content" :item="item">{{ item.content }}</slot>
        </div>
      </Ark.ItemContent>
    </Ark.Item>
  </Ark.Root>
</template>
