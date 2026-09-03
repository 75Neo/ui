<script setup lang="ts">
import { computed, type Component } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { LoaderCircle } from "@lucide/vue";
import { type SwitchProps, switch as switchRecipe } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The checked state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:checked`,
 * with `defaultChecked` as the uncontrolled counterpart Ark's root already takes.
 */
const props = defineProps<
  SwitchProps<Component> & {
    class?: unknown;
    defaultChecked?: boolean;
    ids?: { root?: string; hiddenInput?: string; control?: string; label?: string; thumb?: string };
  }
>();

const emit = defineEmits<{
  /** Fired whenever the switch is flipped. */
  checkedChange: [details: { checked: boolean }];
}>();

defineSlots<{
  /** Replaces the icon riding the thumb while on. Falls back to `checkedIcon`. */
  checkedIcon?: () => unknown;
  /** Replaces the icon riding the thumb while off. Falls back to `uncheckedIcon`. */
  uncheckedIcon?: () => unknown;
  /** Replaces the label text. Falls back to `label`. */
  label?: () => unknown;
  /** Replaces the description text. Falls back to `description`. */
  description?: () => unknown;
}>();

/*
 * `default: undefined` is load-bearing, and `undefined` in the type argument is what
 * lets it typecheck. `defineModel` declares `checked` as a Boolean prop, and Vue casts
 * an absent Boolean prop to `false` unless the declaration carries a default — which
 * would pin every switch to a controlled `false` and leave `defaultChecked` with
 * nothing to do. Ark's own root carries the same defaults.
 */
const checked = defineModel<boolean | undefined>("checked", { default: undefined });

const theme = useResolvedTheme(
  switchRecipe,
  "switch",
  () => props,
  () => props.class as string | undefined,
);

// The recipe spins whichever icon the thumb is showing, so the spinner only has to be
// put in both slots and left there.
const onIcon = computed(() =>
  props.loading ? (props.loadingIcon ?? LoaderCircle) : props.checkedIcon,
);
const offIcon = computed(() =>
  props.loading ? (props.loadingIcon ?? LoaderCircle) : props.uncheckedIcon,
);
</script>

<template>
  <Ark.Root
    v-model:checked="checked"
    data-slot="base"
    :class="theme.class.base"
    :default-checked="props.defaultChecked"
    :disabled="props.disabled || props.loading"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    :value="props.value"
    :form="props.form"
    :ids="props.ids"
    :aria-busy="props.loading || undefined"
    @checked-change="emit('checkedChange', $event)"
  >
    <!--
      A box of the label's own line height, so the track aligns with the first line
      rather than with the top of a two-line block.
    -->
    <span data-slot="container" :class="theme.class.container">
      <Ark.Control data-slot="control" :class="theme.class.control">
        <Ark.Thumb data-slot="thumb" :class="theme.class.thumb">
          <span
            v-if="onIcon != null || $slots.checkedIcon"
            data-slot="checkedIcon"
            :class="theme.class.checkedIcon"
          >
            <slot name="checkedIcon">
              <component :is="onIcon" />
            </slot>
          </span>
          <span
            v-if="offIcon != null || $slots.uncheckedIcon"
            data-slot="uncheckedIcon"
            :class="theme.class.uncheckedIcon"
          >
            <slot name="uncheckedIcon">
              <component :is="offIcon" />
            </slot>
          </span>
        </Ark.Thumb>
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
