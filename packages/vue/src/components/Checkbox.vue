<script setup lang="ts">
import type { Component } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { Check, Minus } from "@lucide/vue";
import { type CheckboxProps, checkbox } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The checked state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:checked`,
 * with `defaultChecked` as the uncontrolled counterpart Ark's root already takes. Both
 * accept `"indeterminate"` alongside `true` and `false`.
 */
const props = defineProps<
  CheckboxProps<Component> & {
    class?: unknown;
    defaultChecked?: boolean | "indeterminate";
    ids?: { root?: string; hiddenInput?: string; control?: string; label?: string };
  }
>();

const emit = defineEmits<{
  /** Fired whenever the box is ticked or unticked. */
  checkedChange: [details: { checked: boolean | "indeterminate" }];
}>();

defineSlots<{
  /** Replaces the tick shown while checked. Falls back to `icon`. */
  icon?: () => unknown;
  /** Replaces the dash shown while indeterminate. Falls back to `indeterminateIcon`. */
  indeterminateIcon?: () => unknown;
  /** Replaces the label text. Falls back to `label`. */
  label?: () => unknown;
  /** Replaces the description text. Falls back to `description`. */
  description?: () => unknown;
}>();

/*
 * `default: undefined` is load-bearing, and `undefined` in the type argument is what
 * lets it typecheck. `defineModel` declares `checked` as a `[Boolean, String]` prop,
 * and Vue casts an absent Boolean prop to `false` unless the declaration carries a
 * default — which would pin every checkbox to a controlled `false` and leave
 * `defaultChecked` with nothing to do. Ark's own root carries the same defaults.
 */
const checked = defineModel<boolean | "indeterminate" | undefined>("checked", {
  default: undefined,
});

const theme = useResolvedTheme(
  checkbox,
  "checkbox",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:checked="checked"
    data-slot="base"
    :class="theme.class.base"
    :default-checked="props.defaultChecked"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    :value="props.value"
    :form="props.form"
    :ids="props.ids"
    @checked-change="emit('checkedChange', $event)"
  >
    <!--
      A box of the label's own line height, so the control aligns with the first line
      rather than with the top of a two-line block.
    -->
    <span data-slot="container" :class="theme.class.container">
      <Ark.Control data-slot="control" :class="theme.class.control">
        <Ark.Indicator data-slot="indicator" :class="theme.class.indicator">
          <slot name="icon">
            <component :is="props.icon ?? Check" />
          </slot>
        </Ark.Indicator>
        <Ark.Indicator indeterminate data-slot="indicator" :class="theme.class.indicator">
          <slot name="indeterminateIcon">
            <component :is="props.indeterminateIcon ?? Minus" />
          </slot>
        </Ark.Indicator>
      </Ark.Control>
    </span>

    <span
      v-if="props.label != null || props.description != null || $slots.label || $slots.description"
      data-slot="wrapper"
      :class="theme.class.wrapper"
    >
      <Ark.Label
        v-if="props.label != null || $slots.label"
        data-slot="label"
        :class="theme.class.label"
      >
        <slot name="label">{{ props.label }}</slot>
      </Ark.Label>
      <span
        v-if="props.description != null || $slots.description"
        data-slot="description"
        :class="theme.class.description"
      >
        <slot name="description">{{ props.description }}</slot>
      </span>
    </span>

    <Ark.HiddenInput />
  </Ark.Root>
</template>
