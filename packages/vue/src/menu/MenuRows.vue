<script setup lang="ts">
import { computed } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn, groupMenuItems, menuRowValue, menuSizeData, type MenuRow } from "@75neo/themes";
import { useMenuVariants } from "./variants";
import MenuCheckboxItem from "./checkbox-item.vue";
import MenuContent from "./content.vue";
import MenuItem from "./item.vue";
import MenuTriggerItem from "./trigger-item.vue";
import type { Component } from "vue";

/** Glyphs the root hands down: the submenu chevron and the checkbox tick. */
export interface RowGlyphs {
  trailingIcon: Component;
  checkedIcon: Component;
}

const props = defineProps<{
  rows: MenuRow<Component>[];
  glyphs: RowGlyphs;
  portal: boolean;
  transition: boolean;
}>();

const variants = useMenuVariants();
</script>

<template>
  <template v-for="(section, index) in groupMenuItems(props.rows)" :key="section.label ?? index">
    <Ark.ItemGroup data-slot="menu-item-group" :class="cn('flex flex-col')">
      <Ark.ItemGroupLabel
        v-if="section.label != null"
        data-slot="menu-item-group-label"
        :class="cn('font-medium text-dimmed select-none', menuSizeData.groupLabel[variants.size])"
      >
        {{ section.label }}
      </Ark.ItemGroupLabel>
      <template v-for="(row, position) in section.items" :key="menuRowValue(row, position)">
        <Ark.Separator
          v-if="row.type === 'separator'"
          data-slot="menu-separator"
          :class="cn('-mx-1 my-1 h-px border-0 bg-border')"
        />
        <Ark.Root v-else-if="row.children != null && row.children.length > 0">
          <MenuTriggerItem :row="row" :trailing-icon="props.glyphs.trailingIcon" />
          <MenuContent :transition="props.transition" :portal="props.portal">
            <MenuRows
              :rows="row.children"
              :glyphs="props.glyphs"
              :portal="props.portal"
              :transition="props.transition"
            />
          </MenuContent>
        </Ark.Root>
        <MenuCheckboxItem
          v-else-if="row.type === 'checkbox'"
          :row="row"
          :checked-icon="props.glyphs.checkedIcon"
        />
        <MenuItem v-else :row="row" />
      </template>
    </Ark.ItemGroup>
  </template>
</template>

<script lang="ts">
// Self-reference for recursion: this module renders itself for submenus.
export default { name: "MenuRows" };
</script>
