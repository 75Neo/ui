<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectValueTextProps>();

const styles = select();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)" />
</template>
