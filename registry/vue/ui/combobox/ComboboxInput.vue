<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

interface ComboboxInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxInputProps>();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
