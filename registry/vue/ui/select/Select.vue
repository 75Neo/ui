<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import type { CollectionItem, ListCollection } from "@ark-ui/vue/collection";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectProps {
  collection: ListCollection<CollectionItem>;
  defaultValue?: string[];
  multiple?: boolean;
  deselectable?: boolean;
  closeOnSelect?: boolean;
  loopFocus?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SelectProps>(), {
  multiple: undefined,
  deselectable: undefined,
  closeOnSelect: undefined,
  loopFocus: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

const value = defineModel<string[]>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = select();
</script>

<template>
  <Ark.Root
    v-model="value"
    :collection="props.collection"
    :default-value="props.defaultValue"
    :multiple="props.multiple"
    :deselectable="props.deselectable"
    :close-on-select="props.closeOnSelect"
    :loop-focus="props.loopFocus"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :form="props.form"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
