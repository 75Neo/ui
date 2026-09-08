<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import type { CollectionItem, ListCollection } from "@ark-ui/vue/collection";
import { cn } from "cn";
import { listboxStyles as styles } from "@/registry/shared/lib/listbox.styles";

interface ListboxProps {
  collection: ListCollection<CollectionItem>;
  defaultValue?: string[];
  selectionMode?: "single" | "multiple" | "extended" | "none";
  deselectable?: boolean;
  disallowSelectAll?: boolean;
  selectOnHighlight?: boolean;
  typeahead?: boolean;
  loopFocus?: boolean;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ListboxProps>(), {
  deselectable: undefined,
  disallowSelectAll: undefined,
  selectOnHighlight: undefined,
  typeahead: undefined,
  loopFocus: undefined,
  disabled: undefined,
});

const value = defineModel<string[]>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :collection="props.collection"
    :default-value="props.defaultValue"
    :selection-mode="props.selectionMode"
    :deselectable="props.deselectable"
    :disallow-select-all="props.disallowSelectAll"
    :select-on-highlight="props.selectOnHighlight"
    :typeahead="props.typeahead"
    :loop-focus="props.loopFocus"
    :orientation="props.orientation"
    :disabled="props.disabled"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
