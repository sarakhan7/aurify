import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO } from "@/hooks/use-seo";

const faqs = [
  {
    q: "What is Aurify?",
    a: "Aurify is an AI-powered communication coach that helps you practice interviews, pitches, stand-ups, and social conversations with real-time feedback.",
  },
  {
    q: "How do you handle privacy?",
    a: "Your sessions are private by default. You can choose what to save. We store only what you consent to and you can delete data anytime.",
  },
  {
    q: "Does Aurify support voice?",
    a: "Yes. You can practice by speaking, get transcripts, and optionally hear improved versions via text-to-speech.",
  },
];

const FAQ = () => {
  useSEO({
    title: "FAQ – Aurify",
    description: "Answers about voice practice, privacy, and how Aurify works.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  });

  return (
    <main className="container mx-auto max-w-3xl px-4 pb-24 pt-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">Learn how Aurify helps you communicate with clarity and confidence.</p>
      </header>

      <section>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};

export default FAQ;
