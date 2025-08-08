import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import JellyfishAvatar from "@/components/branding/JellyfishAvatar";
import { useSEO } from "@/hooks/use-seo";
import { CheckCircle2, MessageSquare, Sparkles, Mic2 } from "lucide-react";

const Index = () => {
  useSEO({
    title: "Aurify – AI Communication Coach & Interview Prep",
    description: "Scenario-based practice with real-time AI feedback, transcripts, and scores. Say it right, every time.",
  });

  return (
    <main>
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-subtle" aria-hidden="true" />
        <section className="container mx-auto max-w-6xl px-4 pt-20 pb-16 text-center">
          <div className="mx-auto mb-8 max-w-2xl">
            <h1 className="text-balance text-4xl font-semibold sm:text-5xl">Aurify: AI Communication Coach</h1>
            <p className="mt-4 text-lg text-muted-foreground">Say it right. Every time. Practice interviews, pitching, stand-ups, and friendships with real-time AI feedback.</p>
          </div>
          <div className="mb-10 flex items-center justify-center gap-3">
            <Button asChild size="lg" variant="hero" className="hover-scale">
              <a href="/practice">Start Practicing</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/faq">How it works</a>
            </Button>
          </div>
          <div className="mx-auto max-w-md">
            <JellyfishAvatar size={200} />
          </div>
        </section>
      </header>

      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles /> Real‑Time Feedback</CardTitle>
              <CardDescription>AI evaluates confidence, clarity, empathy, relevance, and energy.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mic2 /> Voice or Text</CardTitle>
              <CardDescription>Speak or type your replies. Get transcripts and replay sessions.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquare /> Scenario Practice</CardTitle>
              <CardDescription>Interview, pitch, stand‑up, friendship – tailored to your context.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckCircle2 /> Progress Tracking</CardTitle>
              <CardDescription>Save sessions, review feedback, and watch your scores improve.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-24">
        <div className="rounded-xl border bg-card p-8">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 grid gap-6 sm:grid-cols-3">
            <li className="rounded-lg border p-4"><span className="font-medium">1. Choose a scenario</span><p className="text-muted-foreground">Pick professional or casual, add optional context.</p></li>
            <li className="rounded-lg border p-4"><span className="font-medium">2. Speak or type</span><p className="text-muted-foreground">Answer the jellyfish coach and practice delivery.</p></li>
            <li className="rounded-lg border p-4"><span className="font-medium">3. Get instant feedback</span><p className="text-muted-foreground">Scores with guidance to improve right away.</p></li>
          </ol>
        </div>
      </section>
    </main>
  );
};

export default Index;
