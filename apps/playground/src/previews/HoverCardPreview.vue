<script setup lang="ts">
import { ref } from "vue";
import { hoverCard, variantValues } from "@75neo/themes";
import { Button, HoverCard } from "@75neo/vue";

const sizes = variantValues(hoverCard, "size");
const open = ref(false);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
const trigger = "cursor-pointer text-sm text-primary underline-offset-4 hover:underline";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <p class="text-sm text-toned">
        Liked by
        <HoverCard :size="size" title="Sarah Chen" description="@sarah_chen">
          <a href="#profile" :class="trigger" @click.prevent>@sarah_chen</a>

          <template #body>
            <div class="flex flex-col gap-2">
              <p>Design Engineer at Acme Inc. Building beautiful interfaces and design systems.</p>
              <p class="text-muted">
                <span class="font-semibold text-highlighted">14.5K</span> followers ·
                <span class="font-semibold text-highlighted">2,456</span> following
              </p>
            </div>
          </template>
        </HoverCard>
        and 3 others
      </p>
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>arrow</p>
      <p class="text-sm text-toned">
        Reviewed by
        <HoverCard arrow title="Alex Rivera" description="@alex_r">
          <a href="#profile" :class="trigger" @click.prevent>@alex_r</a>

          <template #body>
            <p>Full-stack developer and open source contributor.</p>
          </template>
        </HoverCard>
      </p>
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>eager</p>
      <p class="text-sm text-toned">
        Mentioned by
        <HoverCard
          :open-delay="100"
          :close-delay="100"
          title="Jordan Lee"
          description="@jordan_lee"
        >
          <a href="#profile" :class="trigger" @click.prevent>@jordan_lee</a>

          <template #body>
            <p>DevOps lead. Automating all the things.</p>
          </template>
        </HoverCard>
        in passing
      </p>
    </div>

    <hr class="border-muted" />

    <!-- Controlled: a button owns the state, and the card follows it. -->
    <div class="flex flex-col gap-2">
      <Button variant="outline" color="neutral" size="sm" @click="open = !open">
        {{ open ? "Hide" : "Show" }} the card
      </Button>
      <p class="text-sm text-toned">
        Pinned to
        <HoverCard v-model:open="open" title="Sarah Chen" description="@sarah_chen">
          <a href="#profile" :class="trigger" @click.prevent>@sarah_chen</a>

          <template #body>
            <p>Design Engineer at Acme Inc. Building beautiful interfaces and design systems.</p>
          </template>
        </HoverCard>
      </p>
    </div>
  </div>
</template>
