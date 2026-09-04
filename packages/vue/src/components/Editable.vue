<script setup lang="ts">
import { type Component } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { Check, Pencil, X } from "@lucide/vue";
import { editable, type EditableProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The text and the edit state live outside the shared contract, because React and
 * Vue spell a controlled value too differently to share one type. Here they are
 * `v-model` and `v-model:edit`, with `defaultValue` and `defaultEdit` as the
 * uncontrolled counterparts Ark's root already takes.
 */
const props = withDefaults(
  defineProps<
    EditableProps<Component> & {
      defaultValue?: string;
      defaultEdit?: boolean;
      class?: unknown;
      ids?: {
        root?: string;
        area?: string;
        label?: string;
        preview?: string;
        input?: string;
        control?: string;
        submitTrigger?: string;
        cancelTrigger?: string;
        editTrigger?: string;
      };
    }
  >(),
  /*
   * `selectOnFocus` is the one prop here whose default is `true`, and it is exactly
   * the prop Vue's Boolean casting would get wrong: an absent Boolean-typed prop
   * arrives as `false`, so the text would never select itself unless a caller asked
   * for it by name. `submitMode` and `activationMode` are named for the same reason
   * NumberInput names its trio — so Ark receives a real value rather than an
   * `undefined` spread over its own default. Every other boolean defaults to off,
   * which is what the cast produces anyway.
   */
  { selectOnFocus: true, submitMode: "both", activationMode: "focus" },
);

const emit = defineEmits<{
  /** Fired when the text changes. */
  valueChange: [details: { value: string }];
  /** Fired when the text is committed. */
  valueCommit: [details: { value: string }];
  /** Fired when the text is reverted. */
  valueRevert: [details: { value: string }];
  /** Fired when editing starts or stops. */
  editChange: [details: { edit: boolean }];
}>();

defineSlots<{
  /** Replaces the caption above the field. Falls back to `label`. */
  label?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared
 * prop would reach Ark as a value and pin the field to a controlled one, which
 * would leave `defaultValue` — and, for `edit`, `defaultEdit` — with nothing to do.
 */
const value = defineModel<string | undefined>({ default: undefined });
const edit = defineModel<boolean | undefined>("edit", { default: undefined });

const theme = useResolvedTheme(
  editable,
  "editable",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    v-model:edit="edit"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :default-edit="props.defaultEdit"
    :placeholder="props.placeholder"
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
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
    @value-commit="emit('valueCommit', $event)"
    @value-revert="emit('valueRevert', $event)"
    @edit-change="emit('editChange', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Area data-slot="area" :class="theme.class.area">
      <!--
        The input and the preview stack in the area's first cell, and Ark hides
        whichever one is not showing, so the field never moves when it is entered.
      -->
      <Ark.Input data-slot="input" :class="theme.class.input" />
      <Ark.Preview data-slot="preview" :class="theme.class.preview" />

      <!-- The buttons swap with the edit state, which only Ark's context knows. -->
      <Ark.Context v-slot="api">
        <Ark.Control data-slot="control" :class="theme.class.control">
          <template v-if="api.editing">
            <Ark.SubmitTrigger data-slot="submitTrigger" :class="theme.class.submitTrigger">
              <component :is="props.submitIcon ?? Check" />
            </Ark.SubmitTrigger>
            <Ark.CancelTrigger data-slot="cancelTrigger" :class="theme.class.cancelTrigger">
              <component :is="props.cancelIcon ?? X" />
            </Ark.CancelTrigger>
          </template>
          <Ark.EditTrigger v-else data-slot="editTrigger" :class="theme.class.editTrigger">
            <component :is="props.editIcon ?? Pencil" />
          </Ark.EditTrigger>
        </Ark.Control>
      </Ark.Context>
    </Ark.Area>
  </Ark.Root>
</template>
