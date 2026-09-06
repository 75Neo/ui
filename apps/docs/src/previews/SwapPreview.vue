<script setup lang="ts">
import { ref } from "vue";
import { Moon, Sun } from "@lucide/vue";
import { Button } from "@75neo/vue/button";
import { Swap } from "@75neo/vue/swap";

const dark = ref(false);
</script>

<template>
  <Button variant="outline" color="neutral" square @click="dark = !dark">
    <Swap :swapped="dark" :on-icon="Moon" :off-icon="Sun" />
  </Button>
</template>
