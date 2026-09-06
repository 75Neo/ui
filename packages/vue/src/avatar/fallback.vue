<script setup lang="ts">
import { computed } from "vue";
import { Avatar as Ark } from "@ark-ui/vue/avatar";
import { cva } from "class-variance-authority";
import {
  avatarColorData,
  avatarDefaults,
  avatarSizeData,
  cn,
  getAvatarInitials,
  type AvatarFallbackProps,
} from "@75neo/themes";
import { useAvatarVariants } from "./variants";

const avatarFallback = cva(
  "flex size-full items-center justify-center font-medium tracking-tight uppercase",
  {
    variants: {
      color: avatarColorData.fallback,
      size: avatarSizeData.fallback,
    },
    defaultVariants: avatarDefaults,
  },
);

const props = defineProps<
  AvatarFallbackProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useAvatarVariants();
const fallbackClass = computed(() =>
  cn(avatarFallback(variants), props.class as string | undefined),
);
const initials = computed(() => (props.name ? getAvatarInitials(props.name) : ""));
</script>

<template>
  <Ark.Fallback data-slot="avatar-fallback" :class="fallbackClass">
    <slot>{{ initials }}</slot>
  </Ark.Fallback>
</template>
