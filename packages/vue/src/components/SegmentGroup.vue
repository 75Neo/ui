<script setup lang="ts">
import type { Component } from "vue";
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { segmentGroup, type SegmentGroupProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The choice lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model`.
 */
const props = defineProps<
  SegmentGroupProps<Component> & {
    defaultValue?: string;
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the choice changes. */
  valueChange: [details: { value: string | null }];
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the track to a controlled choice, which would leave
 * `defaultValue` with nothing to do.
 */
const value = defineModel<string | undefined>({ default: undefined });

const theme = useResolvedTheme(
  segmentGroup,
  "segmentGroup",
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
    :orientation="props.orientation"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    @value-change="emit('valueChange', $event)"
  >
    <!--
      Behind the options rather than over them, so their text stays readable and the pill
      slides under it.
    -->
    <Ark.Indicator data-slot="indicator" :class="theme.class.indicator" />

    <Ark.Item
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      data-slot="item"
      :class="theme.class.item"
    >
      <Ark.ItemText data-slot="itemText" :class="theme.class.itemText">
        {{ item.label }}
      </Ark.ItemText>
      <Ark.ItemControl />
      <Ark.ItemHiddenInput />
    </Ark.Item>
  </Ark.Root>
</template>
