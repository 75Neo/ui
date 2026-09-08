<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Avatar as Ark } from "@ark-ui/vue/avatar";
import { cn } from "cn";
import { avatarStyles as styles } from "@/registry/shared/lib/avatar.styles";

interface AvatarFallbackProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<AvatarFallbackProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Fallback :class="cn(styles.fallback(), props.class)">
    <slot />
  </Ark.Fallback>
</template>
