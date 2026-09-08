<script setup lang="ts">
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchThumb,
} from "@/components/vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Switch default-checked>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>On</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>

    <Switch>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>Off</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>

    <Switch disabled default-checked>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>Disabled</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </div>
</template>
