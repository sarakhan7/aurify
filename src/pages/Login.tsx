import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSEO } from "@/hooks/use-seo";

const Login = () => {
  useSEO({ title: "Log in / Sign up – Aurify", description: "Access Aurify to practice and save your progress." });

  return (
    <main className="container mx-auto max-w-xl px-4 pb-24 pt-10">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Log in or create an account to save sessions, customize your profile, and join the community.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" aria-label="Continue with Google">Continue with Google</Button>
          <p className="text-xs text-muted-foreground">To enable authentication, please connect Supabase in Lovable (green button at top-right). Once connected, I’ll wire up secure email/password and OAuth.</p>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
