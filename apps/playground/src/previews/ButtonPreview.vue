<script setup lang="ts">
import { ArrowRight, Rocket } from "@lucide/vue";
import { Button } from "@75neo/vue";
import { colors, sizes, variants } from "./button-matrix";

const label = "mb-2 text-xs text-neutral-400";
const row = "flex flex-wrap items-center gap-2";
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="variant in variants" :key="variant">
      <p :class="label">{{ variant }}</p>
      <div :class="row">
        <Button v-for="color in colors" :key="color" :variant="variant" :color="color">
          {{ color }}
        </Button>
      </div>
    </div>

    <div>
      <p :class="label">size</p>
      <div :class="row">
        <Button v-for="size in sizes" :key="size" :size="size">{{ size }}</Button>
      </div>
    </div>

    <div>
      <p :class="label">state</p>
      <div :class="row">
        <Button>default</Button>
        <Button disabled>disabled</Button>
        <Button loading>loading</Button>
        <Button :leading-icon="Rocket">leading</Button>
        <Button :trailing-icon="ArrowRight">trailing</Button>
      </div>
    </div>
  </div>
</template>
