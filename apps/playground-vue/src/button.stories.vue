<script setup lang="ts">
import { Button, Theme } from "@75neo/vue";
import { ArrowRight, ChevronDown, Download, Mail, Plus, Send } from "@lucide/vue";

const colors = ["primary", "secondary", "neutral", "success", "info", "warning", "error"] as const;
const variants = ["solid", "soft", "outline", "ghost"] as const;
</script>

<template>
  <Stories title="Button" :component="Button">
    <Story title="Default">
      <Button>Button</Button>
    </Story>

    <Story title="Variants">
      <div class="flex items-center gap-2">
        <Button variant="solid">Solid</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </Story>

    <Story title="Sizes">
      <div class="flex items-center gap-2">
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="md">MD</Button>
        <Button size="lg">LG</Button>
        <Button size="xl">XL</Button>
      </div>
    </Story>

    <Story title="Colors">
      <div class="flex flex-wrap items-center gap-2">
        <Button v-for="c in colors" :key="c" :color="c">{{ c }}</Button>
      </div>
    </Story>

    <Story title="Icons">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Button>
            <template #leading><Plus /></template>
            Add item
          </Button>
          <Button variant="outline">
            <template #leading><Download /></template>
            Download
          </Button>
          <Button variant="soft">
            <template #leading><Mail /></template>
            Contact
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <Button>
            Continue
            <template #trailing><ArrowRight /></template>
          </Button>
          <Button variant="outline">
            Options
            <template #trailing><ChevronDown /></template>
          </Button>
          <Button>
            <template #leading><Send /></template>
            Send
            <template #trailing><ArrowRight /></template>
          </Button>
        </div>
      </div>
    </Story>

    <Story title="States">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Button loading>Saving...</Button>
          <Button loading variant="outline">Loading</Button>
          <Button disabled>Disabled</Button>
          <Button disabled variant="outline">Disabled</Button>
        </div>
        <div class="flex items-center gap-2">
          <Button loading>
            <template #leading><Plus /></template>
            Add item
          </Button>
          <Button loading>
            Continue
            <template #trailing><ArrowRight /></template>
          </Button>
          <Button disabled>
            <template #leading><Plus /></template>
            Disabled
          </Button>
        </div>
      </div>
    </Story>

    <Story title="Matrix">
      <div class="flex flex-col gap-6">
        <div v-for="v in variants" :key="v" class="flex flex-col gap-2">
          <h3 class="text-toned text-sm font-semibold capitalize">{{ v }}</h3>
          <div class="flex flex-wrap items-center gap-2">
            <Button v-for="c in colors" :key="c" :variant="v" :color="c">{{ c }}</Button>
          </div>
        </div>
      </div>
    </Story>

    <Story title="Themed">
      <div class="flex items-center gap-4">
        <Button>Default</Button>
        <Theme :ui="{ button: { base: 'rounded-full' } }">
          <Button>Rounded via Theme</Button>
        </Theme>
        <Button :ui="{ base: 'rounded-full bg-secondary' }">Rounded via ui</Button>
      </div>
    </Story>
  </Stories>
</template>
