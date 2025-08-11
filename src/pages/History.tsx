import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import JellyfishAvatar from "@/components/branding/JellyfishAvatar";
import { useSEO } from "@/hooks/use-seo";
const History = () => {
  useSEO({
    title: "History – Aurify",
    description: "Review past practice sessions with transcripts, scores, and replay.",
  });

  return (
    <main className="container mx-auto max-w-4xl px-4 pb-24 pt-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">History</h1>
          <p className="text-muted-foreground">Your saved sessions appear here.</p>
        </div>
        <JellyfishAvatar size={80} />
      </header>

      <Card className="text-center">
        <CardHeader>
          <CardTitle>No sessions yet</CardTitle>
          <CardDescription>Practice to see your progress over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <a href="/practice">Start Practicing</a>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default History;
