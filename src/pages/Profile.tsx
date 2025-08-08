import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Profile = () => {
  useSEO({ title: "Profile – Aurify", description: "Customize your profile, goals, and appearance." });

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
              <Input id="display" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="@username" />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell the world about you" />
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
              <Input id="color" type="color" defaultValue="#6d5ef5" />
            </div>
            <div>
              <Label htmlFor="pfp">Profile photo URL</Label>
              <Input id="pfp" placeholder="https://..." />
            </div>
            <div>
              <Label htmlFor="banner">Banner image URL</Label>
              <Input id="banner" placeholder="https://..." />
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
              <Label htmlFor="resume">Resume URL</Label>
              <Input id="resume" placeholder="https://..." />
            </div>
            <div>
              <Label htmlFor="goals">Goals</Label>
              <Textarea id="goals" placeholder="E.g., improve clarity, STAR stories, reduce filler words" />
            </div>
            <div className="md:col-span-2">
              <Button>Save (connect Supabase to persist)</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Profile;
