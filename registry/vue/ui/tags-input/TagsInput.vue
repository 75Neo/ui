<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cn } from "cn";
import { tagsInput, type TagsInputSize } from "@/registry/shared/lib/tags-input.styles";

interface TagsInputProps {
  defaultValue?: string[];
  max?: number;
  maxLength?: number;
  delimiter?: string | RegExp;
  addOnPaste?: boolean;
  allowDuplicates?: boolean;
  allowOverflow?: boolean;
  editable?: boolean;
  blurBehavior?: "clear" | "add";
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  size?: TagsInputSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TagsInputProps>(), {
  size: "md",
  addOnPaste: undefined,
  allowDuplicates: undefined,
  allowOverflow: undefined,
  editable: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

const value = defineModel<string[]>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tagsInput();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :max="props.max"
    :max-length="props.maxLength"
    :delimiter="props.delimiter"
    :add-on-paste="props.addOnPaste"
    :allow-duplicates="props.allowDuplicates"
    :allow-overflow="props.allowOverflow"
    :editable="props.editable"
    :blur-behavior="props.blurBehavior"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :form="props.form"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
