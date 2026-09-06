<script setup lang="ts">
import { computed } from "vue";
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { cva } from "class-variance-authority";
import {
  cn,
  radioGroupDefaults,
  radioGroupSizeData,
  type RadioGroupItemProps,
} from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";
import RadioGroupItemControl from "./item-control.vue";
import RadioGroupItemDescription from "./item-description.vue";
import RadioGroupItemIndicator from "./item-indicator.vue";
import RadioGroupItemText from "./item-text.vue";

const radioGroupItem = cva(
  "flex min-w-0 cursor-pointer items-start data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: { size: radioGroupSizeData.item },
    defaultVariants: radioGroupDefaults,
  },
);

const props = defineProps<
  RadioGroupItemProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useRadioGroupVariants();
const itemClass = computed(() => cn(radioGroupItem(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Item
    :value="props.item.value"
    :disabled="props.item.disabled"
    data-slot="radio-group-item"
    :class="itemClass"
  >
    <slot>
      <RadioGroupItemControl>
        <RadioGroupItemIndicator />
      </RadioGroupItemControl>
      <span data-slot="radio-group-item-wrapper" :class="cn('min-w-0 flex-1')">
        <RadioGroupItemText>{{ props.item.label }}</RadioGroupItemText>
        <RadioGroupItemDescription v-if="props.item.description != null">
          {{ props.item.description }}
        </RadioGroupItemDescription>
      </span>
    </slot>
    <Ark.ItemHiddenInput />
  </Ark.Item>
</template>
