<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
  <div class="flex flex-wrap items-end gap-4">
    <Avatar v-for="size in sizes" :key="size" :size="size">
      <AvatarImage :src="`https://picsum.photos/seed/75neo-${size}/160/160`" alt="" />
      <AvatarFallback>75</AvatarFallback>
    </Avatar>
  </div>
</template>
