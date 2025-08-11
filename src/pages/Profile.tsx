import { useEffect, useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
const Profile = () => {
  useSEO({ title: "Profile – Aurify", description: "Customize your profile, goals, and appearance." });
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [color, setColor] = useState("#6d5ef5");
  const [pfp, setPfp] = useState("");
  const [banner, setBanner] = useState("");
  const [goals, setGoals] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jellyfishName, setJellyfishName] = useState("Auri");
  const [voice, setVoice] = useState("male"); // male | female | animal

  useEffect(() => {
    try {
      const raw = localStorage.getItem("aurify_profile");
      if (raw) {
        const p = JSON.parse(raw);
        setDisplayName(p.displayName || "");
        setUsername(p.username || "");
        setBio(p.bio || "");
        setColor(p.color || "#6d5ef5");
        setPfp(p.pfp || "");
        setBanner(p.banner || "");
        setGoals(p.goals || "");
        setJellyfishName(p.jellyfishName || "Auri");
        setVoice(p.voice || "male");
      }
    } catch {}
  }, []);

  const onSave = () => {
    const payload = {
      displayName,
      username,
      bio,
      color,
      pfp,
      banner,
      goals,
      jellyfishName,
      voice,
      resume: resumeFile ? { name: resumeFile.name, type: resumeFile.type, size: resumeFile.size } : undefined,
    };
    localStorage.setItem("aurify_profile", JSON.stringify(payload));
    toast({ title: "Profile saved", description: "Your preferences will be used in sessions and community." });
  };

  return (
    <main className="container mx-auto max-w-4xl px-4 pb-24 pt-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Your Profile</h1>
        <p className="text-muted-foreground">Decorate your profile. Changes are local until auth is enabled.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
            <CardDescription>Public details other users can see.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="display">Display name</Label>
              <Input id="display" placeholder="Your name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="@username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell the world about you" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Theme color & banners.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="color">Accent color</Label>
              <Input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="pfp">Profile photo URL</Label>
              <Input id="pfp" placeholder="https://..." value={pfp} onChange={(e) => setPfp(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="banner">Banner image URL</Label>
              <Input id="banner" placeholder="https://..." value={banner} onChange={(e) => setBanner(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coach & Voice</CardTitle>
            <CardDescription>Name your jellyfish and choose the voice.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="jf-name">Jellyfish name</Label>
              <Input id="jf-name" value={jellyfishName} onChange={(e) => setJellyfishName(e.target.value)} />
            </div>
            <div>
              <Label>Voice</Label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger className="mt-2"><SelectValue placeholder="Voice" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="animal">Animal Crossing-style</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Career & Goals</CardTitle>
            <CardDescription>Attach your resume and set goals.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="resume">Resume (PDF or DOC/DOCX)</Label>
              <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} />
              {resumeFile && <p className="mt-1 text-xs text-muted-foreground">Selected: {resumeFile.name}</p>}
            </div>
            <div>
              <Label htmlFor="goals">Goals</Label>
              <Textarea id="goals" placeholder="E.g., improve clarity, STAR stories, reduce filler words" value={goals} onChange={(e) => setGoals(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Button onClick={onSave}>Save</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Profile;
