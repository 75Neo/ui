<script setup lang="ts">
import { type Component } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { Eye, EyeOff } from "@lucide/vue";
import { passwordInput, type PasswordInputProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * Whether the secret is showing lives outside the shared contract, because React
 * and Vue spell a controlled value too differently to share one type. Here it is
 * `v-model:visible`, with `defaultVisible` as the uncontrolled counterpart Ark's
 * root already takes.
 */
const props = withDefaults(
  defineProps<
    PasswordInputProps<Component> & {
      defaultVisible?: boolean;
      class?: unknown;
      ids?: { input?: string; visibilityTrigger?: string };
    }
  >(),
  /*
   * Named so Ark receives a real value rather than an `undefined` spread over its
   * own default. Every other boolean here defaults to off, which is what Vue's
   * Boolean casting produces anyway.
   */
  { autoComplete: "current-password" },
);

const emit = defineEmits<{
  /** Fired when the secret is shown or hidden. */
  visibilityChange: [details: { visible: boolean }];
}>();

defineSlots<{
  /** Replaces the caption above the control. Falls back to `label`. */
  label?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:visible` absent. Without it the
 * declared prop would reach Ark as a value and pin the field to a hidden secret,
 * which would leave `defaultVisible` with nothing to do.
 */
const visible = defineModel<boolean | undefined>("visible", { default: undefined });

const theme = useResolvedTheme(
  passwordInput,
  "passwordInput",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:visible="visible"
    data-slot="base"
    :class="theme.class.base"
    :default-visible="props.defaultVisible"
    :auto-complete="props.autoComplete"
    :name="props.name"
    :ignore-password-managers="props.ignorePasswordManagers"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :ids="props.ids"
    @visibility-change="emit('visibilityChange', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <span v-if="props.leadingIcon" data-slot="leadingIcon" :class="theme.class.leadingIcon">
        <component :is="props.leadingIcon" />
      </span>

      <Ark.Input data-slot="input" :class="theme.class.input" :placeholder="props.placeholder" />

      <Ark.VisibilityTrigger data-slot="visibilityTrigger" :class="theme.class.visibilityTrigger">
        <!--
          Ark shows the default slot while the secret is visible and the fallback
          slot while it is hidden, so the adapter never reads the state itself.
        -->
        <Ark.Indicator data-slot="indicator" :class="theme.class.indicator">
          <component :is="props.visibleIcon ?? Eye" />
          <template #fallback>
            <component :is="props.hiddenIcon ?? EyeOff" />
          </template>
        </Ark.Indicator>
      </Ark.VisibilityTrigger>
    </Ark.Control>
  </Ark.Root>
</template>
