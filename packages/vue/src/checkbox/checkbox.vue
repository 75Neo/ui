<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { Check as CheckIcon, Minus as MinusIcon } from "@lucide/vue";
import { cn, checkboxDefaults, checkboxSizeData, type CheckboxRootProps } from "@75neo/themes";
import { checkboxVariantsKey } from "./variants";
import CheckboxControl from "./control.vue";
import CheckboxDescription from "./description.vue";
import CheckboxIndicator from "./indicator.vue";
import CheckboxLabel from "./label.vue";

const props = defineProps<
  CheckboxRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired whenever the box is ticked or unticked. */
  checkedChange: [details: { checked: boolean | "indeterminate" }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:checked` absent. Without it the
 * declared prop would reach Ark as an explicit `false` and pin every checkbox to
 * unticked, which would leave `defaultChecked` with nothing to do. Ark's own root
 * carries the same defaults, and the type needs `undefined` spelled out or the
 * option does not typecheck.
 */
const checked = defineModel<boolean | "indeterminate" | undefined>("checked", {
  default: undefined,
});

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? checkboxDefaults.color;
  },
  get size() {
    return props.size ?? checkboxDefaults.size;
  },
});
provide(checkboxVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "group/checkbox inline-flex cursor-pointer items-start data-disabled:cursor-not-allowed data-disabled:opacity-75",
    props.class as string | undefined,
  ),
);
const containerClass = computed(() =>
  cn("flex shrink-0 items-center", checkboxSizeData.container[resolved.size]),
);
</script>

<template>
  <Ark.Root
    data-slot="checkbox"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model:checked="checked"
    @checked-change="emit('checkedChange', $event)"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    :value="props.value"
  >
    <span data-slot="checkbox-container" :class="containerClass">
      <CheckboxControl>
        <CheckboxIndicator>
          <component :is="props.icon ?? CheckIcon" />
        </CheckboxIndicator>
        <CheckboxIndicator indeterminate>
          <component :is="props.indeterminateIcon ?? MinusIcon" />
        </CheckboxIndicator>
      </CheckboxControl>
    </span>
    <span
      v-if="props.label != null || props.description != null"
      data-slot="checkbox-wrapper"
      :class="cn('min-w-0 flex-1')"
    >
      <CheckboxLabel v-if="props.label != null">{{ props.label }}</CheckboxLabel>
      <CheckboxDescription v-if="props.description != null">
        {{ props.description }}
      </CheckboxDescription>
    </span>
    <Ark.HiddenInput />
  </Ark.Root>
</template>
