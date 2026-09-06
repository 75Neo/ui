<script setup lang="ts">
import { Avatar as Ark } from "@ark-ui/vue/avatar";
import { cn, type AvatarImageProps } from "@75neo/themes";

const props = defineProps<
  AvatarImageProps & {
    class?: unknown;
  }
>();
</script>

<template>
  <Ark.Image
    :src="props.src"
    :alt="props.alt ?? ''"
    data-slot="avatar-image"
    :class="cn('size-full object-cover', props.class as string | undefined)"
  />
</template>
