<script setup lang="ts">
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { ChevronDownIcon } from "@lucide/vue";
import { computed, useSlots } from "vue";
import { useComponentTheme } from "../theme";
import { useSplitAttrs } from "../utils";
import { type AccordionItem, accordionProps } from "./types";

/**
 * The whole accordion, driven by `items` — Ark's five parts are an implementation
 * detail rather than the API, and every part a caller might want to replace is a named
 * slot instead.
 *
 * Only the presentational props are declared here. Ark's own root props (`multiple`,
 * `collapsible`, `defaultValue`, `unmountOnExit`, `v-model`, …) fall through as
 * attributes, so [its documentation](https://ark-ui.com/docs/components/accordion)
 * applies unchanged.
 */
defineOptions({ name: "NeoAccordion", inheritAttrs: false });

const props = defineProps(accordionProps);
const slots = useSlots();

const { attrsClass, otherAttrs } = useSplitAttrs();
const theme = useComponentTheme("accordion");

const ui = computed(() => theme.value({ disabled: props.disabled }));

const valueOf = (item: AccordionItem, index: number) => String(item[props.valueKey] ?? index);
const labelOf = (item: AccordionItem) => item[props.labelKey] as string | undefined;

const contentSlot = (item: AccordionItem) => item.slot ?? "content";
const bodySlot = (item: AccordionItem) => (item.slot ? `${item.slot}-body` : "body");

/** A row with nothing to show gets no panel at all, rather than an empty animated box. */
const hasContent = (item: AccordionItem) =>
  Boolean(item.content) || Boolean(slots[contentSlot(item)]) || Boolean(slots[bodySlot(item)]);
</script>

<template>
  <Ark.Root
    v-bind="otherAttrs"
    :disabled="props.disabled"
    :class="ui.root({ class: [props.ui?.root, attrsClass] })"
  >
    <Ark.Item
      v-for="(item, index) in props.items"
      :key="valueOf(item, index)"
      :value="valueOf(item, index)"
      :disabled="item.disabled"
      :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })"
    >
      <Ark.ItemContext v-slot="{ expanded }">
        <!-- `disabled` is passed per row, so one disabled row dims its own trigger
             without the rest of the list following. -->
        <Ark.ItemTrigger
          :class="
            ui.trigger({
              disabled: item.disabled ?? props.disabled,
              class: [props.ui?.trigger, item.ui?.trigger],
            })
          "
        >
          <slot name="leading" :item="item" :index="index" :open="expanded">
            <component
              :is="item.icon"
              v-if="item.icon"
              :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })"
              aria-hidden="true"
              focusable="false"
            />
          </slot>

          <span :class="ui.label({ class: [props.ui?.label, item.ui?.label] })">
            <slot :item="item" :index="index" :open="expanded">{{ labelOf(item) }}</slot>
          </span>

          <slot name="trailing" :item="item" :index="index" :open="expanded">
            <component
              :is="item.trailingIcon ?? props.trailingIcon ?? ChevronDownIcon"
              :class="ui.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })"
              aria-hidden="true"
              focusable="false"
            />
          </slot>
        </Ark.ItemTrigger>

        <Ark.ItemContent
          v-if="hasContent(item)"
          :class="ui.content({ class: [props.ui?.content, item.ui?.content] })"
        >
          <slot :name="contentSlot(item)" :item="item" :index="index" :open="expanded">
            <div :class="ui.body({ class: [props.ui?.body, item.ui?.body] })">
              <slot :name="bodySlot(item)" :item="item" :index="index" :open="expanded">
                {{ item.content }}
              </slot>
            </div>
          </slot>
        </Ark.ItemContent>
      </Ark.ItemContext>
    </Ark.Item>
  </Ark.Root>
</template>
