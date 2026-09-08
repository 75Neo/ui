import { X } from "lucide-react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/react";

export default function PopoverOverview() {
  return (
    <div className="flex justify-center py-4">
      <Popover portalled={false}>
        <PopoverTrigger asChild>
          <Button variant="outline">What is a recipe?</Button>
        </PopoverTrigger>

        <PopoverPositioner>
          <PopoverContent>
            <PopoverArrow>
              <PopoverArrowTip />
            </PopoverArrow>
            <PopoverTitle>The recipe</PopoverTitle>
            <PopoverDescription>
              One tailwind-variants call holding every class the component draws. Both adapters
              import it, so restyling happens in one file.
            </PopoverDescription>
            <PopoverCloseTrigger aria-label="Close">
              <X />
            </PopoverCloseTrigger>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </div>
  );
}
