import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import {
  Button,
  Drawer,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/react";

export default function DrawerOverview() {
  return (
    <Drawer swipeDirection="end">
      <DrawerTrigger asChild>
        <Button variant="outline">Open the registry panel</Button>
      </DrawerTrigger>

      <Portal>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerTitle>Registry</DrawerTitle>
            <DrawerDescription>
              Every item the CLI can install, and the files each one writes into your repository.
            </DrawerDescription>

            <DrawerCloseTrigger aria-label="Close">
              <X />
            </DrawerCloseTrigger>
          </DrawerContent>
        </DrawerPositioner>
      </Portal>
    </Drawer>
  );
}
