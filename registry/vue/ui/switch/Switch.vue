<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { cn } from "cn";
import { switchRecipe, type SwitchSize, type Intent } from "@/registry/shared/lib/switch.styles";

interface SwitchProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  form?: string;
  size?: SwitchSize;
  color?: Intent;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SwitchProps>(), {
  defaultChecked: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
  size: "md",
});

const checked = defineModel<boolean>("checked", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

const styles = computed(() => switchRecipe({ color: props.color }));
</script>

<template>
  <Ark.Root
    v-model:checked="checked"
    :default-checked="props.defaultChecked"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :value="props.value"
    :form="props.form"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
