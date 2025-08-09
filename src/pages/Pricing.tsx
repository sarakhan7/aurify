import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    desc: "Practice with text, save 3 sessions",
    features: ["Text practice", "Basic feedback", "3 saved sessions"],
  },
  {
    name: "Pro",
    price: "$12/mo",
    desc: "Voice practice, advanced scores, unlimited history",
    features: ["Voice practice", "Advanced scoring", "Unlimited history", "Replay"],
    featured: true,
  },
  {
    name: "Teams",
    price: "Custom",
    desc: "Managers & coaches",
    features: ["Team seats", "Shared libraries", "Workspace insights"],
  },
];

const Pricing = () => {
  useSEO({ title: "Pricing – Aurify", description: "Flexible plans for personal growth and teams." });

  return (
    <main className="container mx-auto max-w-6xl px-4 pb-24 pt-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-semibold">Pricing</h1>
        <p className="mt-2 text-muted-foreground">Start free. Upgrade when you’re ready.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <Card key={t.name} className={`${t.featured ? "border-primary" : ""} transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]`}>
            <CardHeader>
              <CardTitle>{t.name}</CardTitle>
              <CardDescription>{t.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-3xl font-semibold">{t.price}</div>
              <ul className="mb-6 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{f}</li>
                ))}
              </ul>
              <Button variant={t.featured ? "hero" : "default"} className="w-full">Choose {t.name}</Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default Pricing;
