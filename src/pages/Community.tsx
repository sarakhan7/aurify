import { useEffect, useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
const sample = [
  { user: "Ava", country: "US", streak: 12, score: 87 },
  { user: "Kenji", country: "JP", streak: 9, score: 84 },
  { user: "Lina", country: "DE", streak: 7, score: 81 },
  { user: "Malik", country: "KE", streak: 15, score: 92 },
];

const Community = () => {
  useSEO({ title: "Community – Aurify", description: "Daily check-ins, leaderboards, and friend connections." });
  const { toast } = useToast();
  const [streak, setStreak] = useState(0);
  const [checkedToday, setCheckedToday] = useState(false);
  const [name, setName] = useState("You");

  useEffect(() => {
    try {
      const pRaw = localStorage.getItem("aurify_profile");
      if (pRaw) {
        const p = JSON.parse(pRaw);
        if (p.displayName) setName(p.displayName);
      }
      const last = localStorage.getItem("aurify_last_checkin");
      const sRaw = localStorage.getItem("aurify_streak");
      const today = new Date().toDateString();
      setCheckedToday(last === today);
      setStreak(sRaw ? parseInt(sRaw) : 0);
    } catch {}
  }, []);

  const onCheckIn = () => {
    const today = new Date().toDateString();
    const last = localStorage.getItem("aurify_last_checkin");
    let next = 1;
    if (last) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      next = last === yesterday ? (parseInt(localStorage.getItem("aurify_streak") || "0") || 0) + 1 : 1;
    }
    localStorage.setItem("aurify_last_checkin", today);
    localStorage.setItem("aurify_streak", String(next));
    setCheckedToday(true);
    setStreak(next);
    toast({ title: "Checked in", description: `Streak: ${next} days` });
  };

  const data = [{ user: name, country: "US", streak, score: 80 + (streak % 15) }, ...sample].slice(0, 6);

  return (
    <main className="container mx-auto max-w-5xl px-4 pb-24 pt-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Community</h1>
        <p className="text-muted-foreground">Check in daily, climb the leaderboard, and find partners for mock interviews.</p>
      </header>

      <section className="mb-8 grid gap-6 md:grid-cols-2">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Today’s Check-in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Share a goal for today and keep your streak alive.</p>
            <div className="flex items-center gap-3">
              <Button onClick={onCheckIn} disabled={checkedToday}>{checkedToday ? "Checked in" : "Check in Today"}</Button>
              <span className="text-sm text-muted-foreground">Streak: {streak} day{streak === 1 ? "" : "s"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
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
          {data.map((row) => (
            <Card key={row.user} className="animate-fade-in">
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
