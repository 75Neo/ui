import { Check, ChevronDown } from "lucide-react";
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
} from "@/components/react";

export default function MenuOverview() {
  return (
    <div className="flex justify-center py-4">
      <Menu>
        <MenuTrigger asChild>
          <Button variant="outline" trailing={<ChevronDown />}>
            Registry
          </Button>
        </MenuTrigger>

        <MenuPositioner>
          <MenuContent>
            <MenuItemGroup>
              <MenuItemGroupLabel>Adapter</MenuItemGroupLabel>
              <MenuItem value="react">
                <MenuItemText>React</MenuItemText>
                <MenuItemIndicator>
                  <Check />
                </MenuItemIndicator>
              </MenuItem>
              <MenuItem value="vue">
                <MenuItemText>Vue</MenuItemText>
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
  );
}
