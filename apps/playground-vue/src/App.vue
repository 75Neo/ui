<script setup lang="ts">
import { Button } from "@75neo/vue";
import { css } from "@75neo/styles/css";
import { ref } from "vue";

const variants = ["solid", "outline", "ghost", "danger"] as const;
const sizes = ["sm", "md", "lg"] as const;
const count = ref(0);
</script>

<template>
  <main :class="css({ display: 'grid', gap: '8', maxW: '3xl', mx: 'auto', p: '10' })">
    <header>
      <h1 :class="css({ fontSize: '2xl', fontWeight: 'bold' })">75NeoUI · Vue</h1>
      <p :class="css({ color: 'fg.muted' })">
        Edit <code>packages/vue/src</code> — this page hot-reloads from source.
      </p>
    </header>

    <section :class="css({ display: 'flex', gap: '3', flexWrap: 'wrap' })">
      <Button v-for="variant in variants" :key="variant" :variant="variant">
        {{ variant }}
      </Button>
    </section>

    <section :class="css({ display: 'flex', gap: '3', alignItems: 'center' })">
      <Button v-for="size in sizes" :key="size" :size="size" variant="outline">
        size {{ size }}
      </Button>
    </section>

    <Button full-width @click="count++">Clicked {{ count }} times</Button>
  </main>
</template>
