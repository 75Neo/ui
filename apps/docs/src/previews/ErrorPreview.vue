<script setup lang="ts">
import { TriangleAlert } from "@lucide/vue";
import { Button } from "@75neo/vue/button";
import { Error } from "@75neo/vue/error";
</script>

<template>
  <Error
    class="min-h-48 rounded-lg bg-muted"
    :icon="TriangleAlert"
    :status-code="404"
    status-message="Page not found"
    message="The page you asked for is not here."
  >
    <Button variant="outline" color="neutral">Go back</Button>
  </Error>
</template>
