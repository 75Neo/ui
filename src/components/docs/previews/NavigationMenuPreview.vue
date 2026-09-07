<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import NavigationMenu from "@/registry/vue/ui/navigation-menu/NavigationMenu.vue";
import NavigationMenuContent from "@/registry/vue/ui/navigation-menu/NavigationMenuContent.vue";
import NavigationMenuItem from "@/registry/vue/ui/navigation-menu/NavigationMenuItem.vue";
import NavigationMenuLink from "@/registry/vue/ui/navigation-menu/NavigationMenuLink.vue";
import NavigationMenuList from "@/registry/vue/ui/navigation-menu/NavigationMenuList.vue";
import NavigationMenuTrigger from "@/registry/vue/ui/navigation-menu/NavigationMenuTrigger.vue";

const groups = [
  {
    value: "components",
    label: "Components",
    links: [
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/table", label: "Table" },
      { href: "/docs/components/toc", label: "Table of contents" },
    ],
  },
  {
    value: "guides",
    label: "Guides",
    links: [
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/customization", label: "Customization" },
    ],
  },
];
</script>

<template>
  <NavigationMenu class="justify-center">
    <NavigationMenuList>
      <NavigationMenuItem v-for="group in groups" :key="group.value" :value="group.value">
        <NavigationMenuTrigger>
          {{ group.label }}
          <template #trailing>
            <ChevronDown />
          </template>
        </NavigationMenuTrigger>

        <NavigationMenuContent>
          <NavigationMenuLink v-for="link in group.links" :key="link.href" :href="link.href">
            {{ link.label }}
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
