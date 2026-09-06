<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@75neo/vue/avatar";
</script>

<template>
  <div class="flex items-center gap-3">
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="Ada Lovelace" />
      <AvatarFallback name="Ada Lovelace" />
    </Avatar>
    <Avatar color="primary">
      <AvatarFallback name="Grace Hopper" />
    </Avatar>
    <Avatar color="success" shape="square" size="lg">
      <AvatarFallback name="Alan Turing" />
    </Avatar>
  </div>
</template>
