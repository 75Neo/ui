<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { RatingGroup as Ark } from "@ark-ui/vue/rating-group";
import { cn } from "cn";
import { ratingGroup, type Intent } from "@/registry/shared/lib/rating-group.styles";

interface RatingGroupProps {
  defaultValue?: number;
  count?: number;
  allowHalf?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  color?: Intent;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<RatingGroupProps>(), {
  allowHalf: undefined,
  autoFocus: undefined,
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
});

const value = defineModel<number>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = computed(() => ratingGroup({ color: props.color }));
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :count="props.count"
    :allow-half="props.allowHalf"
    :auto-focus="props.autoFocus"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :form="props.form"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
