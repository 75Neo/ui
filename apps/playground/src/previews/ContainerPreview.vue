<script setup lang="ts">
import { Container } from "@75neo/vue";

const measures = ["30rem", "48rem", "72rem"];
const label = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <!--
    The edges are drawn on the Container itself, so what is visible is the measure and
    the gutter rather than a box around them. Each row narrows `--ui-container`, which is
    the one number a site changes to move every Container, Header and Footer at once.
  -->
  <div class="flex flex-col gap-6">
    <div v-for="measure in measures" :key="measure" class="flex flex-col gap-2">
      <p :class="label" data-identifier>{{ measure }}</p>
      <div class="rounded-lg bg-muted py-3" :style="{ '--ui-container': measure }">
        <Container class="rounded-md bg-default py-3 text-center text-sm ring ring-accented">
          Held to {{ measure }}, and off the edge by the gutter
        </Container>
      </div>
    </div>
  </div>
</template>
