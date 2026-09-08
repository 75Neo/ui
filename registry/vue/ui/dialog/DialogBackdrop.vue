<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn } from "cn";
import { dialogStyles as styles } from "@/registry/shared/lib/dialog.styles";

interface DialogBackdropProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DialogBackdropProps>();
</script>

<template>
  <Ark.Backdrop :class="cn(styles.backdrop(), props.class)" />
</template>
