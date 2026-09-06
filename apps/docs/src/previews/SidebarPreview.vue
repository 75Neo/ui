<script setup lang="ts">
import { Sidebar } from "@75neo/vue/sidebar";
</script>

<template>
  <div class="relative h-56 overflow-hidden rounded-lg ring ring-default ring-inset">
    <Sidebar
      collapsible="none"
      title="75NeoUI"
      description="Components"
      class="h-full [--sidebar-width:12rem]"
    >
      <nav class="flex flex-col gap-1 text-sm text-toned">
        <a href="#button">Button</a>
        <a href="#select">Select</a>
        <a href="#dialog">Dialog</a>
      </nav>
    </Sidebar>
  </div>
</template>
