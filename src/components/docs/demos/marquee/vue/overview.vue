<script setup lang="ts">
import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeViewport,
} from "@/components/vue";

const items = ["Ark UI", "Tailwind v4", "tailwind-variants", "Registry", "Astro", "Comark"];
</script>

<template>
  <Marquee :speed="30" pause-on-interaction>
    <MarqueeViewport>
      <MarqueeContent>
        <MarqueeItem v-for="item in items" :key="item">
          <span class="font-mono text-sm text-muted">{{ item }}</span>
        </MarqueeItem>
      </MarqueeContent>
    </MarqueeViewport>
    <MarqueeEdge side="start" />
    <MarqueeEdge side="end" />
  </Marquee>
</template>
