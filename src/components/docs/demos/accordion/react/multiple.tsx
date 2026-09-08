import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from "@/components/react";

const sections = [
  { value: "react", title: "React", body: "Icons are props and the class prop is className." },
  { value: "vue", title: "Vue", body: "Icons are slots and the class prop is class." },
];

export default function AccordionMultiple() {
  return (
    <Accordion multiple defaultValue={["react", "vue"]}>
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
