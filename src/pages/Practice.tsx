import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import JellyfishAvatar from "@/components/branding/JellyfishAvatar";
import { useSEO } from "@/hooks/use-seo";

const Field = ({ id, label, placeholder, textarea = false }: { id: string; label: string; placeholder: string; textarea?: boolean }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    {textarea ? (
      <Textarea id={id} placeholder={placeholder} className="min-h-[120px]" />
    ) : (
      <Input id={id} placeholder={placeholder} />
    )}
  </div>
);

const Practice = () => {
  useSEO({
    title: "Practice – Aurify",
    description: "Scenario-based practice for interviews, pitching, stand-ups, and friendships with AI feedback.",
  });

  return (
    <main className="container mx-auto max-w-5xl px-4 pb-24 pt-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Practice</h1>
          <p className="text-muted-foreground">Choose a mode, add context, and start.
          </p>
        </div>
        <JellyfishAvatar size={96} />
      </header>

      <Tabs defaultValue="professional" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="casual">Casual</TabsTrigger>
        </TabsList>

        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interview</CardTitle>
              <CardDescription>Upload your resume and job description for targeted mock questions.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field id="resume" label="Resume URL" placeholder="https://..." />
              <Field id="job" label="Job Description URL" placeholder="https://..." />
              <div className="md:col-span-2">
                <Field id="notes" label="Notes / Focus Areas" placeholder="E.g., STAR stories, leadership, metrics..." textarea />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button variant="hero">Start Session</Button>
                <Button variant="outline">Use Voice</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stand-up Meeting</CardTitle>
              <CardDescription>Enter your project summary and blockers.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field id="project" label="Project" placeholder="Feature name or initiative" />
              <Field id="audience" label="Audience" placeholder="Team, leadership, cross-functional" />
              <div className="md:col-span-2">
                <Field id="summary" label="Summary" placeholder="What did you do? What's next? Any blockers?" textarea />
              </div>
              <div className="md:col-span-2">
                <Button>Start Coaching</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="casual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Improve a Friendship</CardTitle>
              <CardDescription>Describe your friend and your intention for the next chat.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Field id="friend" label="Friend name & traits" placeholder="e.g., Ali – introverted, punctual, loves hiking" />
              <Field id="intention" label="Intention" placeholder="e.g., reconnect, resolve tension about X, plan trip" />
              <Field id="context" label="Context" placeholder="What happened recently? Any sensitivities?" textarea />
              <Button>Get Conversation Starters</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Practice;
