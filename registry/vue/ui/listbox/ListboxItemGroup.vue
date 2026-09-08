<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

interface ListboxItemGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxItemGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = listbox();
</script>

<template>
  <Ark.ItemGroup :class="cn(styles.itemGroup(), props.class)">
    <slot />
  </Ark.ItemGroup>
</template>
