<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxInputProps>();

const styles = combobox();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
