<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

interface EditablePreviewProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<EditablePreviewProps>();
</script>

<template>
  <Ark.Preview :class="cn(styles.preview(), props.class)" />
</template>
