import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sample = [
  { user: "Ava", country: "US", streak: 12, score: 87 },
  { user: "Kenji", country: "JP", streak: 9, score: 84 },
  { user: "Lina", country: "DE", streak: 7, score: 81 },
  { user: "Malik", country: "KE", streak: 15, score: 92 },
];

const Community = () => {
  useSEO({ title: "Community – Aurify", description: "Daily check-ins, leaderboards, and friend connections." });

  return (
    <main className="container mx-auto max-w-5xl px-4 pb-24 pt-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Community</h1>
        <p className="text-muted-foreground">Check in daily, climb the leaderboard, and find partners for mock interviews.</p>
      </header>

      <section className="mb-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today’s Check-in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Share a goal for today and keep your streak alive.</p>
            <Button>Check in (auth required)</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Find a Partner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Match with peers worldwide for real mock interviews.</p>
            <Button variant="outline">Connect (auth required)</Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Leaderboard</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {sample.map((row) => (
            <Card key={row.user}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{row.user} · {row.country}</span>
                  <span className="text-sm text-muted-foreground">Streak: {row.streak}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-2 w-full rounded bg-secondary">
                  <div className="h-2 rounded bg-primary" style={{ width: `${row.score}%` }} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Score: {row.score}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Community;
