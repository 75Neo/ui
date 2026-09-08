<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listboxStyles as styles } from "@/registry/shared/lib/listbox.styles";

interface ListboxInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxInputProps>();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
