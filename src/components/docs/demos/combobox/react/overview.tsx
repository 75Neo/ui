import { useListCollection } from "@ark-ui/react/collection";
import { Check, ChevronDown, X } from "lucide-react";
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@/components/react";

const items = [
  "Accordion",
  "Avatar",
  "Button",
  "Checkbox",
  "Dialog",
  "Popover",
  "Table",
  "Tabs",
  "Tooltip",
];

export default function ComboboxOverview() {
  const { collection, filter } = useListCollection({ initialItems: items });

  return (
    <div className="max-w-72">
      <Combobox collection={collection} onInputValueChange={(event) => filter(event.inputValue)}>
        <ComboboxLabel>Find a component</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput placeholder="Start typing" />
          <ComboboxClearTrigger aria-label="Clear">
            <X />
          </ComboboxClearTrigger>
          <ComboboxTrigger aria-label="Open">
            <ChevronDown />
          </ComboboxTrigger>
        </ComboboxControl>

        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxEmpty>Nothing matches that.</ComboboxEmpty>
            <ComboboxList>
              {collection.items.map((item) => (
                <ComboboxItem key={item} item={item}>
                  <ComboboxItemText>{item}</ComboboxItemText>
                  <ComboboxItemIndicator>
                    <Check />
                  </ComboboxItemIndicator>
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </ComboboxPositioner>
      </Combobox>
    </div>
  );
}
