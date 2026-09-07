<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { cn } from "cn";
import { radioGroup } from "@/registry/shared/lib/radio-group.styles";

interface RadioGroupItemControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<RadioGroupItemControlProps>();

const styles = radioGroup();
</script>

<template>
  <Ark.ItemControl :class="cn(styles.itemControl(), props.class)" />
</template>
