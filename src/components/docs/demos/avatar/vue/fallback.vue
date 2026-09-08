<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Avatar size="lg">
      <AvatarFallback>VC</AvatarFallback>
    </Avatar>

    <Avatar size="lg">
      <AvatarImage src="https://example.invalid/missing.png" alt="" />
      <AvatarFallback>75</AvatarFallback>
    </Avatar>
  </div>
</template>
