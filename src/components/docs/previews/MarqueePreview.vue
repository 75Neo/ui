<script setup lang="ts">
import Marquee from "@/registry/vue/ui/marquee/Marquee.vue";
import MarqueeContent from "@/registry/vue/ui/marquee/MarqueeContent.vue";
import MarqueeEdge from "@/registry/vue/ui/marquee/MarqueeEdge.vue";
import MarqueeItem from "@/registry/vue/ui/marquee/MarqueeItem.vue";
import MarqueeViewport from "@/registry/vue/ui/marquee/MarqueeViewport.vue";

const items = ["Ark UI", "Tailwind v4", "tailwind-variants", "shadcn registry", "Astro", "Comark"];
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
    <MarqueeEdge side="left" />
    <MarqueeEdge side="right" />
  </Marquee>
</template>
