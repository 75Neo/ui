<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { cn } from "cn";
import { switchStyles as styles } from "@/registry/shared/lib/switch.styles";

interface SwitchThumbProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SwitchThumbProps>();
</script>

<template>
  <Ark.Thumb :class="cn(styles.thumb(), props.class)" />
</template>
