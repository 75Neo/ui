<script setup lang="ts">
import { User } from "@lucide/vue";
import { avatar, variantValues } from "@75neo/themes";
import { Avatar } from "@75neo/vue";

const sizes = variantValues(avatar, "size");
const shapes = variantValues(avatar, "shape");
const colors = variantValues(avatar, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
const rowItems = "flex flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="shape in shapes" :key="shape" :class="row">
        <p :class="rowLabel" data-identifier>{{ shape }}</p>
        <div :class="rowItems">
          <Avatar
            v-for="size in sizes"
            :key="`${shape}-${size}`"
            :fallback="(size as string).toUpperCase()"
            :size="size"
            :shape="shape"
          />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>color</p>
        <div :class="rowItems">
          <Avatar
            v-for="color in colors"
            :key="color"
            :color="color"
            :fallback="(color as string).slice(0, 2)"
            size="lg"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>fallback</p>
        <div :class="rowItems">
          <Avatar fallback="PA" size="md" />
          <Avatar name="Ada Lovelace" size="md" />
          <Avatar name="John" size="md" />
          <Avatar size="md">
            <template #fallback><User class="size-5" /></template>
          </Avatar>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>image</p>
        <div :class="rowItems">
          <Avatar src="https://github.com/nstcrystal.png" alt="User 1" fallback="U1" size="md" />
          <Avatar src="https://github.com/2giosangmitom.png" alt="User 2" fallback="U2" size="lg" />
          <Avatar src="https://github.com/nstcrystal.png" alt="User 3" fallback="U3" size="xl" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>broken</p>
        <div :class="rowItems">
          <Avatar src="https://invalid.example/broken.jpg" alt="Broken" fallback="FB" size="md" />
          <Avatar
            src="https://invalid.example/broken.jpg"
            alt="Broken"
            name="Fallback User"
            size="md"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>custom</p>
        <div :class="rowItems">
          <Avatar
            src="https://github.com/nstcrystal.png"
            alt="Custom image"
            fallback="CI"
            size="lg"
          >
            <template #image="{ src, alt, class: cls, hidden, props }">
              <img
                :src="src"
                :alt="alt"
                :class="cls"
                v-bind="props"
                data-slot="image"
                data-mock="nuxt-img"
                width="80"
                height="80"
                :style="{
                  ...(props.style as Record<string, string> | undefined),
                  visibility: hidden ? 'hidden' : 'visible',
                }"
              />
            </template>
          </Avatar>
          <span class="text-xs text-muted">via #image (e.g. NuxtImg)</span>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>group</p>
        <div :class="rowItems">
          <div class="flex -space-x-2">
            <Avatar fallback="AL" size="md" class="ring-2 ring-bg" />
            <Avatar fallback="JD" size="md" class="ring-2 ring-bg" />
            <Avatar
              src="https://github.com/nstcrystal.png"
              alt="G1"
              fallback="G1"
              size="md"
              class="ring-2 ring-bg"
            />
            <Avatar
              src="https://github.com/2giosangmitom.png"
              alt="G2"
              fallback="G2"
              size="md"
              class="ring-2 ring-bg"
            />
            <Avatar fallback="+3" size="md" class="ring-2 ring-bg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
