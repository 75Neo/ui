<script setup lang="ts">
import { Check, ChevronDown } from "@lucide/vue";
import Button from "@/registry/vue/ui/button/Button.vue";
import Menu from "@/registry/vue/ui/menu/Menu.vue";
import MenuContent from "@/registry/vue/ui/menu/MenuContent.vue";
import MenuItem from "@/registry/vue/ui/menu/MenuItem.vue";
import MenuItemGroup from "@/registry/vue/ui/menu/MenuItemGroup.vue";
import MenuItemGroupLabel from "@/registry/vue/ui/menu/MenuItemGroupLabel.vue";
import MenuItemIndicator from "@/registry/vue/ui/menu/MenuItemIndicator.vue";
import MenuItemText from "@/registry/vue/ui/menu/MenuItemText.vue";
import MenuPositioner from "@/registry/vue/ui/menu/MenuPositioner.vue";
import MenuSeparator from "@/registry/vue/ui/menu/MenuSeparator.vue";
import MenuTrigger from "@/registry/vue/ui/menu/MenuTrigger.vue";
</script>

<template>
  <div class="flex justify-center py-4">
    <Menu>
      <MenuTrigger as-child>
        <Button variant="outline">
          Registry
          <template #trailing>
            <ChevronDown />
          </template>
        </Button>
      </MenuTrigger>

      <MenuPositioner>
        <MenuContent>
          <MenuItemGroup>
            <MenuItemGroupLabel>Adapter</MenuItemGroupLabel>
            <MenuItem value="react">
              <MenuItemText>React</MenuItemText>
            </MenuItem>
            <MenuItem value="vue">
              <MenuItemText>Vue</MenuItemText>
              <MenuItemIndicator>
                <Check />
              </MenuItemIndicator>
            </MenuItem>
          </MenuItemGroup>

          <MenuSeparator />

          <MenuItem value="copy">
            <MenuItemText>Copy the install command</MenuItemText>
          </MenuItem>
          <MenuItem value="remove" disabled>
            <MenuItemText>Remove from the project</MenuItemText>
          </MenuItem>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  </div>
</template>
