<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

interface ListboxContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = listbox();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
