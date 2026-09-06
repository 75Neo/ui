<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { PasswordInput as Ark } from "@ark-ui/vue/password-input";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "@lucide/vue";
import {
  cn,
  passwordInputDefaults,
  passwordInputSizeData,
  type PasswordInputRootProps,
} from "@75neo/themes";
import { passwordInputVariantsKey } from "./variants";
import PasswordInputControl from "./control.vue";
import PasswordInputIndicator from "./indicator.vue";
import PasswordInputInput from "./input.vue";
import PasswordInputLabel from "./label.vue";
import PasswordInputVisibilityTrigger from "./visibility-trigger.vue";

const props = defineProps<
  PasswordInputRootProps<Component> & {
    class?: unknown;
    defaultVisible?: boolean;
    ids?: { input?: string; visibilityTrigger?: string };
  }
>();

const emit = defineEmits<{
  /** Fired when the secret is shown or hidden. */
  visibilityChange: [details: { visible: boolean }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:visible` absent. Without it the
 * declared prop would reach Ark as an explicit `false` and pin the field shut.
 */
const visible = defineModel<boolean | undefined>("visible", { default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? passwordInputDefaults.color;
  },
  get size() {
    return props.size ?? passwordInputDefaults.size;
  },
});
provide(passwordInputVariantsKey, resolved);

const rootClass = computed(() =>
  cn("flex w-full min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
const leadingClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", passwordInputSizeData.leadingIcon[resolved.size]),
);
</script>

<template>
  <Ark.Root
    data-slot="password-input"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model:visible="visible"
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
    <PasswordInputLabel v-if="props.label != null">{{ props.label }}</PasswordInputLabel>
    <PasswordInputControl>
      <span
        v-if="props.leadingIcon != null"
        data-slot="password-input-leading-icon"
        :class="leadingClass"
      >
        <component :is="props.leadingIcon" />
      </span>
      <PasswordInputInput :placeholder="props.placeholder" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator>
          <component :is="props.visibleIcon ?? EyeIcon" />
          <template #fallback>
            <component :is="props.hiddenIcon ?? EyeOffIcon" />
          </template>
        </PasswordInputIndicator>
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </Ark.Root>
</template>
