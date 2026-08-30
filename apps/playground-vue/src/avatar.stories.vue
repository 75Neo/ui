<script setup lang="ts">
import { ref } from "vue";
import { Avatar, Theme } from "@75neo/vue";
import { User } from "@lucide/vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const shapes = ["circle", "square"] as const;
const colors = ["neutral", "primary", "secondary", "success", "info", "warning", "error"] as const;

// `<script setup>` runs once per story, so this state is not shared between them.
const status = ref("loading");
const src = ref("https://github.com/nstcrystal.png");

function onStatusChange(details: { status: string }) {
  status.value = details.status;
}

function changeSrc() {
  src.value = src.value.includes("nstcrystal")
    ? "https://github.com/2giosangmitom.png"
    : "https://github.com/nstcrystal.png";
}
</script>

<template>
  <Stories title="Avatar" :component="Avatar">
    <Story title="Default">
      <div class="flex items-center gap-4">
        <Avatar src="https://github.com/nstcrystal.png" alt="Alex" text="AL" size="md" />
        <Avatar text="JD" size="md" />
        <Avatar size="md">
          <template #icon><User class="size-5" /></template>
        </Avatar>
      </div>
    </Story>

    <Story title="Sizes">
      <div class="flex flex-wrap items-end gap-4">
        <div v-for="s in sizes" :key="s" class="flex flex-col items-center gap-2">
          <Avatar :text="s.toUpperCase()" :size="s" />
          <span class="text-muted text-xs">{{ s }}</span>
        </div>
      </div>
    </Story>

    <Story title="Colors">
      <div class="flex flex-wrap items-center gap-4">
        <div v-for="c in colors" :key="c" class="flex flex-col items-center gap-2">
          <Avatar :text="c.slice(0, 2).toUpperCase()" :color="c" size="lg" />
          <span class="text-muted text-xs">{{ c }}</span>
        </div>
      </div>
    </Story>

    <Story title="Shapes">
      <div class="flex items-center gap-4">
        <Avatar text="CN" shape="circle" size="lg" />
        <Avatar text="SQ" shape="square" size="lg" />
        <Avatar src="https://github.com/nstcrystal.png" alt="Shape" shape="square" size="lg" />
      </div>
    </Story>

    <Story title="Fallbacks">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Avatar text="PA" size="md" />
          <Avatar alt="Ada Lovelace" size="md" />
          <Avatar text="AB" size="md" color="primary" />
          <Avatar size="md">
            <template #fallback><User class="size-5" /></template>
          </Avatar>
        </div>
        <div class="flex items-center gap-4">
          <Avatar src="https://github.com/nstcrystal.png" alt="User" text="U1" size="md" />
          <Avatar src="https://invalid.example/broken.jpg" alt="Broken" text="FB" size="md" />
        </div>
        <p class="text-muted text-xs">
          Fallback via text, initials derived from alt, or the #fallback slot; broken image shows
          fallback.
        </p>
      </div>
    </Story>

    <Story title="With Status">
      <div class="flex flex-col gap-3">
        <output class="text-sm">
          Status: <span class="font-mono font-semibold">{{ status }}</span>
        </output>
        <div class="flex items-center gap-4">
          <Avatar :src="src" alt="Status" text="ST" size="lg" @status-change="onStatusChange" />
          <button
            type="button"
            class="bg-muted hover:bg-accented rounded px-2 py-1 text-xs"
            @click="changeSrc"
          >
            Change src
          </button>
        </div>
      </div>
    </Story>

    <Story title="Slots">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-4">
          <Avatar size="lg" color="primary" src="https://github.com/nstcrystal.png" alt="Pham An" />
          <Avatar size="lg" shape="square">
            <template #icon><User class="size-6" /></template>
          </Avatar>
          <Avatar size="lg" color="info" alt="Vo Quang Chien">
            <template #fallback="{ initials }">
              <span class="text-xs">{{ initials }}</span>
            </template>
          </Avatar>
        </div>
        <p class="text-muted text-xs">
          <code>#icon</code> and <code>#fallback</code> slots — <code>#fallback</code> receives
          <code>{ initials }</code>
        </p>
      </div>
    </Story>

    <Story title="Themed">
      <div class="flex items-center gap-4">
        <Avatar text="TH" size="lg" />
        <Theme
          :ui="{
            avatar: {
              root: 'ring-2 ring-primary ring-offset-2',
              fallback: 'bg-primary text-white',
            },
          }"
        >
          <Avatar text="TH" size="lg" />
        </Theme>
        <Avatar
          text="TH"
          size="lg"
          :ui="{ root: 'ring-2 ring-success', fallback: 'bg-success text-white' }"
        />
      </div>
    </Story>

    <Story title="Group">
      <div class="flex -space-x-2">
        <Avatar text="AL" size="md" class="ring-2 ring-white" />
        <Avatar text="JD" size="md" class="ring-2 ring-white" />
        <Avatar
          src="https://github.com/nstcrystal.png"
          alt="G1"
          text="G1"
          size="md"
          class="ring-2 ring-white"
        />
        <Avatar text="+3" size="md" class="bg-accented ring-2 ring-white" />
      </div>
    </Story>

    <Story title="Matrix">
      <div class="flex flex-col gap-6">
        <div v-for="shape in shapes" :key="shape" class="flex flex-col gap-2">
          <h3 class="text-toned text-sm font-semibold capitalize">{{ shape }}</h3>
          <div class="flex flex-wrap items-end gap-3">
            <div
              v-for="size in sizes"
              :key="shape + '-' + size"
              class="flex flex-col items-center gap-1"
            >
              <Avatar :text="size.toUpperCase()" :size="size" :shape="shape" />
              <span class="text-muted text-[10px]">{{ size }}</span>
            </div>
          </div>
        </div>
      </div>
    </Story>
  </Stories>
</template>
