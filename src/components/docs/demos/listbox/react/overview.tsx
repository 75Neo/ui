import { createListCollection } from "@ark-ui/react/collection";
import { Check } from "lucide-react";
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from "@/components/react";

const collection = createListCollection({
  items: [
    { label: "Accordion", value: "accordion" },
    { label: "Button", value: "button" },
    { label: "Dialog", value: "dialog" },
    { label: "Table", value: "table" },
    { label: "Tabs", value: "tabs" },
  ],
});

export default function ListboxOverview() {
  return (
    <div className="max-w-64">
      <Listbox collection={collection} selectionMode="multiple" defaultValue={["button"]}>
        <ListboxLabel>Items to install</ListboxLabel>
        <ListboxContent>
          {collection.items.map((item) => (
            <ListboxItem key={item.value} item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
              <ListboxItemIndicator>
                <Check />
              </ListboxItemIndicator>
            </ListboxItem>
          ))}
        </ListboxContent>
      </Listbox>
    </div>
  );
}
