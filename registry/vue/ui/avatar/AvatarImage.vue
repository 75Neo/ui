<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Avatar as Ark } from "@ark-ui/vue/avatar";
import { cn } from "cn";
import { avatar } from "@/registry/shared/lib/avatar.styles";

interface AvatarImageProps {
  src?: string;
  alt?: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<AvatarImageProps>();

const styles = avatar();
</script>

<template>
  <Ark.Image :src="props.src" :alt="props.alt" :class="cn(styles.image(), props.class)" />
</template>
