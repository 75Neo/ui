<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listboxStyles as styles } from "@/registry/shared/lib/listbox.styles";

interface ListboxValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxValueTextProps>();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)" />
</template>
