<script setup lang="ts">
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchThumb,
} from "@/components/vue";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Switch v-for="color in colors" :key="color" :color="color" default-checked>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>{{ color }}</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </div>
</template>
