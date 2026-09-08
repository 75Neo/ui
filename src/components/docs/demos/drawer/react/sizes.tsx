import { Portal } from "@ark-ui/react/portal";
import {
  Button,
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerDescription,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/react";

const sizes = ["sm", "md", "lg", "xl", "full"] as const;

export default function DrawerSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {sizes.map((size) => (
        <Drawer key={size} swipeDirection="end">
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">
              {size}
            </Button>
          </DrawerTrigger>

          <Portal>
            <DrawerBackdrop />
            <DrawerPositioner>
              <DrawerContent size={size}>
                <DrawerTitle>Size {size}</DrawerTitle>
                <DrawerDescription>
                  Width only applies to the left and right placements.
                </DrawerDescription>
              </DrawerContent>
            </DrawerPositioner>
          </Portal>
        </Drawer>
      ))}
    </div>
  );
}
