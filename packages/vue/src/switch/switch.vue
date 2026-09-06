<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { LoaderCircle as LoaderCircleIcon } from "@lucide/vue";
import { cn, switchDefaults, type SwitchRootProps } from "@75neo/themes";
import { switchVariantsKey } from "./variants";
import SwitchControl from "./control.vue";
import SwitchDescription from "./description.vue";
import SwitchLabel from "./label.vue";
import SwitchThumb from "./thumb.vue";

const props = defineProps<
  SwitchRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired whenever the switch is flipped. */
  checkedChange: [details: { checked: boolean }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:checked` absent. Without it the
 * declared prop would reach Ark as an explicit `false` and pin every switch off,
 * leaving `defaultChecked` with nothing to do. Ark's own root carries the same
 * defaults, and the type needs `undefined` spelled out or the option does not
 * typecheck.
 */
const checked = defineModel<boolean | undefined>("checked", { default: undefined });

const isLoading = computed(() => props.loading ?? false);
const resolved = reactive({
  get color() {
    return props.color ?? switchDefaults.color;
  },
  get size() {
    return props.size ?? switchDefaults.size;
  },
  get loading() {
    return isLoading.value;
  },
});
provide(switchVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "inline-flex cursor-pointer items-start data-disabled:cursor-not-allowed data-disabled:opacity-75",
    props.class as string | undefined,
  ),
);
</script>

<template>
  <Ark.Root
    data-slot="switch"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model:checked="checked"
    @checked-change="emit('checkedChange', $event)"
    :disabled="props.disabled || isLoading"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    :value="props.value"
  >
    <SwitchControl>
      <SwitchThumb
        :checked-icon="isLoading ? (props.loadingIcon ?? LoaderCircleIcon) : props.checkedIcon"
        :unchecked-icon="isLoading ? (props.loadingIcon ?? LoaderCircleIcon) : props.uncheckedIcon"
      />
    </SwitchControl>
    <span
      v-if="props.label != null || props.description != null"
      data-slot="switch-wrapper"
      :class="cn('min-w-0 flex-1')"
    >
      <SwitchLabel v-if="props.label != null">{{ props.label }}</SwitchLabel>
      <SwitchDescription v-if="props.description != null">
        {{ props.description }}
      </SwitchDescription>
    </span>
  </Ark.Root>
</template>
