import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@75neo/react/accordion";

export function AccordionPreview() {
  return (
    <Accordion defaultValue={["shipping"]}>
      <AccordionItem value="shipping">
        <AccordionItemTrigger>Shipping</AccordionItemTrigger>
        <AccordionItemContent>Two to four working days.</AccordionItemContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionItemTrigger>Returns</AccordionItemTrigger>
        <AccordionItemContent>Thirty days, no questions.</AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
