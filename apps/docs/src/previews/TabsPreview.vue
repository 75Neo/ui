<script setup lang="ts">
import { Tabs } from "@75neo/vue/tabs";

const items = [
  { value: "account", label: "Account", content: "Make changes here." },
  { value: "password", label: "Password", content: "Change it here." },
];
</script>

<template>
  <div class="max-w-md">
    <Tabs :items="items" default-value="account" />
  </div>
</template>
