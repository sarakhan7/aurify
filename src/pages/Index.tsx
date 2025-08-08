import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import JellyfishAvatar from "@/components/branding/JellyfishAvatar";
import { useSEO } from "@/hooks/use-seo";
import { CheckCircle2, MessageSquare, Sparkles, Mic2, PlayCircle } from "lucide-react";

const FeatureCard = ({ title, desc, icon: Icon }: { title: string; desc: string; icon: any }) => (
  <Card className="animate-fade-in">
    <CardHeader>
      <CardTitle className="flex items-center gap-2"><Icon /> {title}</CardTitle>
      <CardDescription>{desc}</CardDescription>
    </CardHeader>
  </Card>
);

const Index = () => {
  useSEO({
    title: "Aurify – AI Communication Coach & Interview Prep",
    description: "Scenario-based practice with real-time AI feedback, transcripts, and scores. Say it right, every time.",
  });

  return (
    <main>
      {/* Hero */}
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
              <a href="/pricing">See Pricing</a>
            </Button>
          </div>
          <div className="mx-auto max-w-md">
            <JellyfishAvatar size={200} />
          </div>
        </section>
      </header>

      {/* Feature highlights */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard title="Real‑Time Feedback" desc="AI evaluates confidence, clarity, empathy, relevance, and energy." icon={Sparkles} />
          <FeatureCard title="Voice or Text" desc="Speak or type your replies. Get transcripts and replay sessions." icon={Mic2} />
          <FeatureCard title="Scenario Practice" desc="Interview, pitch, stand‑up, friendship – tailored to your context." icon={MessageSquare} />
          <FeatureCard title="Progress Tracking" desc="Save sessions, review feedback, and watch your scores improve." icon={CheckCircle2} />
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl border bg-card p-8">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 grid gap-6 sm:grid-cols-3">
            <li className="rounded-lg border p-4"><span className="font-medium">1. Choose a scenario</span><p className="text-muted-foreground">Pick professional or casual, add optional context.</p></li>
            <li className="rounded-lg border p-4"><span className="font-medium">2. Speak or type</span><p className="text-muted-foreground">Answer the jellyfish coach and practice delivery.</p></li>
            <li className="rounded-lg border p-4"><span className="font-medium">3. Get instant feedback</span><p className="text-muted-foreground">Scores with guidance to improve right away.</p></li>
          </ol>
        </div>
      </section>

      {/* Deep dive sections */}
      <section className="container mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Professional Mode</CardTitle>
            <CardDescription>Interviews, stand-ups, pitches – bring your resume or job post for tailored drills.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Upload resume + JD → targeted questions</li>
              <li>• Speak answers, auto-transcripts, replay</li>
              <li>• Actionable next steps after each session</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Casual Mode</CardTitle>
            <CardDescription>Make new friends and improve relationships with context-aware practice.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Icebreakers and social scenarios</li>
              <li>• Empathy and tone coaching</li>
              <li>• Reflective prompts to build confidence</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Demo video */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-xl border bg-card p-2 sm:p-4">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2"><PlayCircle className="text-primary" /><h2 className="text-xl font-semibold">Product Demo</h2></div>
            <Button asChild variant="outline"><a href="/practice">Try it now</a></Button>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-lg border">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
              title="Aurify Demo Video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-6xl px-4 pb-24">
        <div className="rounded-xl border bg-gradient-primary p-10 text-center text-primary-foreground shadow-[var(--shadow-elegant)]">
          <h2 className="text-3xl font-semibold">Find your voice with Aurify</h2>
          <p className="mt-2 opacity-90">Join thousands leveling up communication every day.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild size="lg" variant="hero"><a href="/login">Create account</a></Button>
            <Button asChild size="lg" variant="outline"><a href="/pricing">View pricing</a></Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
