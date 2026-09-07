<script setup lang="ts">
import Switch from "@/registry/vue/ui/switch/Switch.vue";
import SwitchControl from "@/registry/vue/ui/switch/SwitchControl.vue";
import SwitchHiddenInput from "@/registry/vue/ui/switch/SwitchHiddenInput.vue";
import SwitchLabel from "@/registry/vue/ui/switch/SwitchLabel.vue";
import SwitchThumb from "@/registry/vue/ui/switch/SwitchThumb.vue";

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

    <Switch>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>off</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>

    <Switch disabled default-checked>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>disabled</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </div>
</template>
