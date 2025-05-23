import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
type FAQEntry = {
  question: string;
  answer: React.ReactNode;
};
type AccordianFAQProps = {
  faqs: FAQEntry[];
};
export const AccordianFAQ = ({ faqs }: AccordianFAQProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, idx) => (
        <AccordionItem key={idx} value={`item-${idx}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
