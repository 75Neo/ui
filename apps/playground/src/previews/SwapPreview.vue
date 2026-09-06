<script setup lang="ts">
import { ref } from "vue";
import { Moon, Pause, Play, Sun } from "@lucide/vue";
import { Button } from "@75neo/vue/button";
import { Swap } from "@75neo/vue/swap";
import { swapSchema } from "@75neo/themes";

const sizes = swapSchema.size.values;
const dark = ref(false);
const playing = ref(false);

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
const rowItems = "flex min-w-0 flex-wrap items-center gap-3";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>sizes</p>
        <div :class="rowItems">
          <Swap
            v-for="size in sizes"
            :key="size"
            :size="size"
            swapped
            :on-icon="Moon"
            :off-icon="Sun"
          />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>off</p>
        <div :class="rowItems">
          <Swap :on-icon="Moon" :off-icon="Sun" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>on</p>
        <div :class="rowItems">
          <Swap swapped :on-icon="Moon" :off-icon="Sun" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>in a button</p>
        <div :class="rowItems">
          <Button variant="outline" color="neutral" square @click="dark = !dark">
            <Swap :swapped="dark" :on-icon="Moon" :off-icon="Sun" />
          </Button>
          <Button variant="solid" square @click="playing = !playing">
            <Swap :swapped="playing" :on-icon="Pause" :off-icon="Play" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
