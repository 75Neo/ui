<script setup lang="ts">
import { Button, Popover } from "@75neo/vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Popover title="Notifications" description="Where the noisy ones go.">
      <Button variant="outline" color="neutral">Open</Button>
      <template #body>
        Every part of this panel is addressed by name rather than handed in as markup.
      </template>
    </Popover>
    <Popover title="With an arrow" placement="bottom" arrow close>
      <Button variant="soft" color="neutral">With an arrow</Button>
      <template #body>Pointing back at the button that opened it.</template>
    </Popover>
  </div>
</template>
