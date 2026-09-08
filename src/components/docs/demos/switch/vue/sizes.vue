<script setup lang="ts">
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchThumb,
} from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Switch v-for="size in sizes" :key="size" :size="size" default-checked>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>{{ size }}</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </div>
</template>
