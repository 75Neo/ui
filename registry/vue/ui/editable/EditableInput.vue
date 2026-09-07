<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

interface EditableInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<EditableInputProps>();

const styles = editable();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
