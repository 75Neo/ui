<script setup lang="ts">
import { Check, ChevronDown } from "@lucide/vue";
import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemIndicator,
  MenuItemText,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
} from "@/components/vue";
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
