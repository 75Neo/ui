<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { Check as CheckIcon, Pencil as PencilIcon, X as XIcon } from "@lucide/vue";
import { cn, editableDefaults, type EditableRootProps } from "@75neo/themes";
import { editableVariantsKey } from "./variants";
import EditableArea from "./area.vue";
import EditableCancelTrigger from "./cancel-trigger.vue";
import EditableControl from "./control.vue";
import EditableEditTrigger from "./edit-trigger.vue";
import EditableInput from "./input.vue";
import EditableLabel from "./label.vue";
import EditablePreview from "./preview.vue";
import EditableSubmitTrigger from "./submit-trigger.vue";

const props = defineProps<
  EditableRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the text changes. */
  valueChange: [details: { value: string }];
  /** Fired when the text is committed. */
  valueCommit: [details: { value: string }];
  /** Fired when the text is reverted. */
  valueRevert: [details: { value: string }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps absent `v-model`s absent. Without them the declared
 * props would reach Ark as values and pin the field, leaving the defaults idle.
 */
const value = defineModel<string | undefined>({ default: undefined });
const edit = defineModel<boolean | undefined>("edit", { default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? editableDefaults.color;
  },
  get size() {
    return props.size ?? editableDefaults.size;
  },
});
provide(editableVariantsKey, resolved);

const rootClass = computed(() =>
  cn("flex w-full min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    data-slot="editable"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model="value"
    v-model:edit="edit"
    @value-change="emit('valueChange', $event)"
    @value-commit="emit('valueCommit', $event)"
    @value-revert="emit('valueRevert', $event)"
    :activation-mode="props.activationMode"
    :submit-mode="props.submitMode"
    :auto-resize="props.autoResize"
    :max-length="props.maxLength"
    :select-on-focus="props.selectOnFocus"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    :form="props.form"
  >
    <EditableLabel v-if="props.label != null">{{ props.label }}</EditableLabel>
    <EditableArea>
      <EditableInput :placeholder="props.placeholder" />
      <EditablePreview />
      <Ark.Context v-slot="api">
        <EditableControl>
          <template v-if="api.editing">
            <EditableSubmitTrigger>
              <component :is="props.submitIcon ?? CheckIcon" />
            </EditableSubmitTrigger>
            <EditableCancelTrigger>
              <component :is="props.cancelIcon ?? XIcon" />
            </EditableCancelTrigger>
          </template>
          <EditableEditTrigger v-else>
            <component :is="props.editIcon ?? PencilIcon" />
          </EditableEditTrigger>
        </EditableControl>
      </Ark.Context>
    </EditableArea>
  </Ark.Root>
</template>
