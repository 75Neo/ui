<script setup lang="ts">
import { Pagination } from "@75neo/vue";
</script>

<template>
  <Pagination :count="200" :default-page="4" edges />
</template>
