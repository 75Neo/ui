<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Avatar as Ark } from "@ark-ui/vue/avatar";
import { cn } from "cn";
import { avatarStyles as styles, type AvatarSize } from "@/registry/shared/lib/avatar.styles";

interface AvatarProps {
  size?: AvatarSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: "md",
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root :data-size="props.size" :class="cn(styles.root(), props.class)">
    <slot />
  </Ark.Root>
</template>
