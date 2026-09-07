<script setup lang="ts">
import Tabs from "@/registry/vue/ui/tabs/Tabs.vue";
import TabsContent from "@/registry/vue/ui/tabs/TabsContent.vue";
import TabsIndicator from "@/registry/vue/ui/tabs/TabsIndicator.vue";
import TabsList from "@/registry/vue/ui/tabs/TabsList.vue";
import TabsTrigger from "@/registry/vue/ui/tabs/TabsTrigger.vue";

const panels = [
  {
    value: "react",
    label: "React",
    body: "The adapter is a function component. Icons come in as props, and className merges through cn.",
  },
  {
    value: "vue",
    label: "Vue",
    body: "The adapter is a single file component. Icons come in as slots, and class merges through cn.",
  },
  {
    value: "shared",
    label: "Shared",
    body: "Both import the same tailwind-variants recipe, so the classes only exist in one place.",
  },
];
</script>

<template>
  <Tabs default-value="react">
    <TabsList>
      <TabsTrigger v-for="panel in panels" :key="panel.value" :value="panel.value">
        {{ panel.label }}
      </TabsTrigger>
      <TabsIndicator />
    </TabsList>
    <TabsContent v-for="panel in panels" :key="panel.value" :value="panel.value">
      <p class="text-sm text-muted">{{ panel.body }}</p>
    </TabsContent>
  </Tabs>
</template>
