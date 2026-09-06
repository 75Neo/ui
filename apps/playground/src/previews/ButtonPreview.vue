<script setup lang="ts">
import { Button } from "@75neo/vue/button";
import { buttonSchema } from "@75neo/themes";
import { Star } from "@lucide/vue";

const variants = buttonSchema.variant.values;
const colors = buttonSchema.color.values;
const sizes = buttonSchema.size.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="variant in variants" :key="variant" :class="row">
        <p :class="rowLabel" data-identifier>{{ variant }}</p>
        <div :class="rowItems">
          <Button :variant="variant">Save</Button>
          <Button :variant="variant" :leading-icon="Star">Starred</Button>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="rowItems">
          <Button v-for="color in colors" :key="color" :color="color">{{ color }}</Button>
        </div>
      </div>

      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Button :size="size">Save</Button>
          <Button :size="size" :leading-icon="Star">Starred</Button>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>block</p>
        <div :class="rowItems">
          <Button block>Full width</Button>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>square</p>
        <div :class="rowItems">
          <Button square :leading-icon="Star" aria-label="Star" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>loading</p>
        <div :class="rowItems">
          <Button loading>Save</Button>
          <Button loading trailing :trailing-icon="Star">Save</Button>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <Button disabled>Save</Button>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>override</p>
        <div :class="rowItems">
          <Button class="px-8">Call-site padding wins</Button>
        </div>
      </div>
    </div>
  </div>
</template>
