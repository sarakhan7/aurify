import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JellyfishAvatar from "@/components/branding/JellyfishAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const demoQuestions: Record<string, string[]> = {
  "Interviews": [
    "Tell me about yourself.",
    "Describe a challenging project you led.",
    "How do you handle tight deadlines?",
    "Share a time you influenced without authority.",
    "Why this role and company?",
  ],
  "Stand-up Meetings": [
    "What did you do yesterday?",
    "What will you do today?",
    "Any blockers?",
    "Who do you need help from?",
    "What's the demo plan?",
  ],
  "Pitching Startups": [
    "What problem are you solving?",
    "What's your unique insight?",
    "Who is your user?",
    "How do you make money?",
    "Why now?",
  ],
  "Improve Friendship": [
    "What's one positive thing you appreciate about them?",
    "What's the recent friction about?",
    "How might they feel?",
    "What's your goal for the next chat?",
    "What small gesture can you do this week?",
  ],
  "Make a New Friend": [
    "What's your one-line intro?",
    "Why are you at this event?",
    "What common interests can you share?",
    "What's a good question to ask a stranger?",
    "How will you follow up?",
  ],
  "Custom": [
    "Set the scene for this practice.",
    "Who is your audience?",
    "What is your key message?",
    "What risks or objections exist?",
    "How will you close?",
  ],
};

const speak = (text: string, voicePref: string) => {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  // Simple voice mapping demo
  const voices = window.speechSynthesis.getVoices();
  const pick =
    voicePref === "female"
      ? voices.find(v => /female|woman|samantha|victoria|zira/i.test(v.name))
      : voicePref === "animal"
      ? voices.find(v => /novelty|whisper|bad|alien/i.test(v.name))
      : voices.find(v => /male|man|daniel|fred|alex|george/i.test(v.name));
  if (pick) u.voice = pick;
  u.rate = 1.0;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const Session = () => {
  const [params] = useSearchParams();
  const scenario = params.get("scenario") || "Interviews";
  const mode = params.get("mode") || "practice";
  const { toast } = useToast();

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [voice, setVoice] = useState("male"); // male | female | animal

  const currentQuestion = useMemo(() => demoQuestions[scenario]?.[index] ?? "Let's begin.", [scenario, index]);

  useEffect(() => {
    if (started) speak(currentQuestion, voice);
  }, [started, index, voice, currentQuestion]);

  // Basic (optional) browser speech recognition
  const recognitionRef = useRef<any>();
  useEffect(() => {
    const W = window as any;
    const SR = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        text += e.results[i][0].transcript + " ";
      }
      setTranscript(text.trim());
    };
    recognitionRef.current = rec;
    return () => rec.abort();
  }, []);

  const toggleMic = () => {
    const rec = recognitionRef.current;
    if (!rec) {
      toast({ title: "Voice input unavailable", description: "Your browser doesn't support speech recognition. Type below instead." });
      return;
    }
    if (isRecording) {
      rec.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      rec.start();
      setIsRecording(true);
    }
  };

  const onSend = () => {
    if (index < 4) {
      setIndex(index + 1);
      setTranscript("");
    } else {
      setStarted(false);
      toast({ title: "Session complete", description: "Showing demo feedback below." });
    }
  };

  return (
    <main className="container mx-auto max-w-4xl px-4 pb-24 pt-10">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{mode === "quiz" ? "Quiz" : "Practice"} Session</h1>
          <p className="text-muted-foreground">Scenario: {scenario} · 5 questions</p>
        </div>
        <JellyfishAvatar size={96} circular speaking={started && !isRecording} />
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Aurify Coach</CardTitle>
          <CardDescription>Jellyfish voice and options</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="text-sm">Jellyfish name</label>
            <Input defaultValue="Auri" aria-label="Jellyfish name" />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm">Voice</label>
            <Select defaultValue={voice} onValueChange={setVoice}>
              <SelectTrigger className="mt-2"><SelectValue placeholder="Voice" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="animal">Animal Crossing-style</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1 flex items-end">
            {!started ? (
              <Button className="w-full" onClick={() => { setStarted(true); speak(currentQuestion, voice); }}>Start</Button>
            ) : (
              <Button variant={isRecording ? "destructive" : "outline"} className="w-full" onClick={toggleMic}>{isRecording ? "Stop Mic" : "Mic"}</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {started && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Question {index + 1} of 5</CardTitle>
            <CardDescription>{currentQuestion}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea placeholder="Live transcription appears here (or type manually)" value={transcript} onChange={(e) => setTranscript(e.target.value)} className="min-h-[120px]" />
            <div className="flex gap-3">
              <Button onClick={() => speak(currentQuestion, voice)} variant="outline">Repeat</Button>
              <Button onClick={onSend}>Send Response</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!started && index === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Feedback (Demo)</CardTitle>
            <CardDescription>Detailed AI breakdown and scores will appear here once Supabase + AI are connected.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: "Confidence", score: 82 },
                { name: "Clarity", score: 88 },
                { name: "Empathy", score: 74 },
                { name: "Relevance", score: 90 },
                { name: "Energy", score: 80 },
              ].map((s) => (
                <div key={s.name} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between"><span className="font-medium">{s.name}</span><span className="text-sm text-muted-foreground">{s.score}</span></div>
                  <div className="h-2 w-full rounded bg-secondary">
                    <div className="h-2 rounded bg-primary" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              <p className="text-sm text-muted-foreground">Advice: Focus on concise openings and concrete metrics. Slow down slightly and emphasize outcomes.</p>
              <div className="flex gap-3">
                <Button onClick={() => { localStorage.setItem("aurify_saved_demo", "1"); toast({ title: "Saved (Demo)", description: "Connect Supabase to persist history securely." }); }}>Save to History</Button>
                <Button variant="outline" onClick={() => window.location.assign("/history")}>View History</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default Session;
