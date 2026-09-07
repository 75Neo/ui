<script setup lang="ts">
import Avatar from "@/registry/vue/ui/avatar/Avatar.vue";
import AvatarFallback from "@/registry/vue/ui/avatar/AvatarFallback.vue";
import AvatarImage from "@/registry/vue/ui/avatar/AvatarImage.vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
  <div class="flex flex-wrap items-end gap-4">
    <Avatar v-for="size in sizes" :key="size" :size="size">
      <AvatarImage :src="`https://picsum.photos/seed/75neo-${size}/160/160`" alt="" />
      <AvatarFallback>75</AvatarFallback>
    </Avatar>

    <Avatar size="lg">
      <AvatarFallback>VC</AvatarFallback>
    </Avatar>
  </div>
</template>
