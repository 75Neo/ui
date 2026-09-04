<script setup lang="ts">
import type { Component } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { X } from "@lucide/vue";
import { tagsInput, type TagsInputProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The tags live outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here they are `v-model`, holding an array of
 * strings.
 */
const props = withDefaults(
  defineProps<
    TagsInputProps<Component> & {
      defaultValue?: string[];
      class?: unknown;
    }
  >(),
  /*
   * The two props here whose default is `true`, and both are exactly what Vue's Boolean
   * casting would get wrong: an absent Boolean-typed prop arrives as `false`, so a tag
   * could never be rewritten and the clear button would never render unless a caller
   * asked for each by name. Every other boolean below defaults to off, which is what
   * the cast produces anyway.
   */
  { clearable: true, editable: true },
);

const emit = defineEmits<{
  /** Fired whenever a tag is added, rewritten or removed. */
  valueChange: [details: { value: string[] }];
}>();

defineSlots<{
  /** Replaces the caption above the control. Falls back to `label`. */
  label?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the field to a controlled set of tags, which would
 * leave `defaultValue` with nothing to do.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

const theme = useResolvedTheme(
  tagsInput,
  "tagsInput",
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
    :max="props.max"
    :max-length="props.maxLength"
    :delimiter="props.delimiter"
    :add-on-paste="props.addOnPaste"
    :allow-duplicates="props.allowDuplicates"
    :allow-overflow="props.allowOverflow"
    :editable="props.editable"
    :blur-behavior="props.blurBehavior"
    :auto-focus="props.autoFocus"
    :validate="props.validate"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    @value-change="emit('valueChange', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <!--
        Ark hands back the tags it is holding, so the chips come from its context rather
        than from the prop — which is what keeps an uncontrolled field's chips in step
        with the tags it actually has.
      -->
      <Ark.Context v-slot="api">
        <Ark.Item
          v-for="(tag, index) in api.value"
          :key="`${tag}-${index}`"
          :index="index"
          :value="tag"
          data-slot="item"
          :class="theme.class.item"
        >
          <!--
            The chip and the field it becomes while being edited. Ark shows one or the
            other, and both carry the chip's measurements so the swap moves nothing
            around it.
          -->
          <Ark.ItemPreview data-slot="itemPreview" :class="theme.class.itemPreview">
            <Ark.ItemText data-slot="itemText" :class="theme.class.itemText">
              {{ tag }}
            </Ark.ItemText>
            <Ark.ItemDeleteTrigger
              data-slot="itemDeleteTrigger"
              :class="theme.class.itemDeleteTrigger"
            >
              <component :is="props.deleteIcon ?? X" />
            </Ark.ItemDeleteTrigger>
          </Ark.ItemPreview>
          <Ark.ItemInput data-slot="itemInput" :class="theme.class.itemInput" />
        </Ark.Item>
      </Ark.Context>

      <Ark.Input data-slot="input" :class="theme.class.input" :placeholder="props.placeholder" />

      <Ark.ClearTrigger
        v-if="props.clearable"
        data-slot="clearTrigger"
        :class="theme.class.clearTrigger"
      >
        <component :is="props.clearIcon ?? X" />
      </Ark.ClearTrigger>
    </Ark.Control>

    <!--
      The one part with no slot of its own: it is hidden by contract, so a class on it
      would style nothing. It is what puts the tags into a form.
    -->
    <Ark.HiddenInput />
  </Ark.Root>
</template>
