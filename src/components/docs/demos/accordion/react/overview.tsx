import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from "@/components/react";

const sections = [
  {
    value: "install",
    title: "How do I install a component?",
    body: "Point the shadcn CLI at the registry and run add. The source lands in your own repository.",
  },
  {
    value: "theme",
    title: "Can I change the colors?",
    body: "Override the --ui-* properties in your stylesheet. Every component follows without being touched.",
  },
  {
    value: "upgrade",
    title: "What happens on an upgrade?",
    body: "Re-running the CLI overwrites the file, so keep your edits in git and review the diff.",
  },
];

export default function AccordionOverview() {
  return (
    <Accordion collapsible defaultValue={["install"]}>
      {sections.map((section) => (
        <AccordionItem key={section.value} value={section.value}>
          <AccordionItemTrigger>
            {section.title}
            <AccordionItemIndicator>
              <ChevronDown />
            </AccordionItemIndicator>
          </AccordionItemTrigger>
          <AccordionItemContent>{section.body}</AccordionItemContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
