<script setup lang="ts">
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from "@/components/vue";

const colors = ["primary", "info", "success", "error"] as const;
</script>

<template>
  <div class="flex flex-col gap-8">
    <Tabs v-for="color in colors" :key="color" :color="color" default-value="one">
      <TabsList>
        <TabsTrigger value="one">{{ color }}</TabsTrigger>
        <TabsTrigger value="two">Second</TabsTrigger>
        <TabsIndicator />
      </TabsList>
    </Tabs>
  </div>
</template>
