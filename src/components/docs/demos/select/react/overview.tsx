import { createListCollection } from "@ark-ui/react/collection";
import { Check, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from "@/components/react";

const collection = createListCollection({
  items: [
    { label: "Blue", value: "blue" },
    { label: "Teal", value: "teal" },
    { label: "Violet", value: "violet" },
    { label: "Rose", value: "rose" },
  ],
});

export default function SelectOverview() {
  return (
    <div className="max-w-64">
      <Select collection={collection} defaultValue={["teal"]}>
        <SelectLabel>Primary colour</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValueText placeholder="Pick a colour" />
            <SelectIndicator>
              <ChevronDown />
            </SelectIndicator>
          </SelectTrigger>
        </SelectControl>

        <SelectPositioner>
          <SelectContent>
            <SelectList>
              {collection.items.map((item) => (
                <SelectItem key={item.value} item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
              ))}
            </SelectList>
          </SelectContent>
        </SelectPositioner>
        <SelectHiddenSelect />
      </Select>
    </div>
  );
}
