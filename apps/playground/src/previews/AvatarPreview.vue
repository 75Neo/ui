<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@75neo/vue/avatar";
import { avatarSchema } from "@75neo/themes";

const sizes = avatarSchema.size.values;
const colors = avatarSchema.color.values;
const shapes = avatarSchema.shape.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>sizes</p>
        <div :class="rowItems">
          <Avatar v-for="size in sizes" :key="size" :size="size">
            <AvatarFallback name="Ada Lovelace" />
          </Avatar>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="rowItems">
          <Avatar v-for="color in colors" :key="color" :color="color">
            <AvatarFallback name="Ada Lovelace" />
          </Avatar>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>shapes</p>
        <div :class="rowItems">
          <Avatar v-for="shape in shapes" :key="shape" :shape="shape" color="primary">
            <AvatarFallback name="Grace Hopper" />
          </Avatar>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>image</p>
        <div :class="rowItems">
          <Avatar size="lg">
            <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="Ada Lovelace" />
            <AvatarFallback name="Ada Lovelace" />
          </Avatar>
          <Avatar size="lg" shape="square">
            <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="Grace Hopper" />
            <AvatarFallback name="Grace Hopper" />
          </Avatar>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>fallback</p>
        <div :class="rowItems">
          <Avatar>
            <AvatarFallback name="Ada" />
          </Avatar>
          <Avatar color="warning">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  </div>
</template>
