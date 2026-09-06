<script setup lang="ts">
import { Button } from "@75neo/vue/button";
import { Header } from "@75neo/vue/header";
</script>

<template>
  <div class="overflow-hidden rounded-lg ring ring-default ring-inset">
    <Header title="75NeoUI" href="#" class="static">
      <nav class="flex gap-3 text-sm text-toned">
        <a href="#components">Components</a>
        <a href="#guides">Guides</a>
      </nav>
      <template #end>
        <Button size="sm">Sign in</Button>
      </template>
      <template #menu>
        <p class="text-sm text-toned">Components · Guides · Docs</p>
      </template>
    </Header>
  </div>
</template>
