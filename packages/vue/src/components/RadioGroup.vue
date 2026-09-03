<script setup lang="ts">
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { type RadioGroupProps, radioGroup } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The picked value lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model`, with
 * `defaultValue` as the uncontrolled counterpart Ark's root already takes.
 */
const props = defineProps<
  RadioGroupProps & {
    class?: unknown;
    defaultValue?: string;
    ids?: {
      root?: string;
      label?: string;
      indicator?: string;
      item?: (value: string) => string;
      itemLabel?: (value: string) => string;
      itemControl?: (value: string) => string;
      itemHiddenInput?: (value: string) => string;
    };
  }
>();

const emit = defineEmits<{
  /** Fired whenever a different option is picked. */
  valueChange: [details: { value: string | null }];
}>();

defineSlots<{
  /** Overrides the `legend` prop. */
  legend?: () => unknown;
}>();

/*
 * A string model needs no `default: undefined`: the cast that catches Boolean props
 * leaves everything else alone.
 */
const value = defineModel<string | undefined>({ default: undefined });

const theme = useResolvedTheme(
  radioGroup,
  "radioGroup",
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
    :form="props.form"
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
  >
    <Ark.Label
      v-if="props.legend != null || $slots.legend"
      data-slot="legend"
      :class="theme.class.legend"
    >
      <slot name="legend">{{ props.legend }}</slot>
    </Ark.Label>

    <Ark.Item
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      data-slot="item"
      :class="theme.class.item"
    >
      <!--
        A box of the label's own line height, so the control aligns with the first line
        rather than with the top of a two-line block.
      -->
      <span data-slot="container" :class="theme.class.container">
        <Ark.ItemControl data-slot="control" :class="theme.class.control">
          <span data-slot="indicator" :class="theme.class.indicator" />
        </Ark.ItemControl>
      </span>

      <span data-slot="wrapper" :class="theme.class.wrapper">
        <Ark.ItemText data-slot="label" :class="theme.class.label">{{ item.label }}</Ark.ItemText>
        <span
          v-if="item.description != null"
          data-slot="description"
          :class="theme.class.description"
        >
          {{ item.description }}
        </span>
      </span>

      <Ark.ItemHiddenInput />
    </Ark.Item>
  </Ark.Root>
</template>
