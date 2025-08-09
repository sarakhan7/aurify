import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Monitor, Sun, Moon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";

const Footer = () => {
  const { toast } = useToast();
  const { theme, setTheme, systemTheme } = useTheme();

  const setLanguage = (value: string) => {
    localStorage.setItem("aurify_lang", value);
    toast({ title: "Language updated", description: `Set to ${value}. Translations coming soon.` });
  };

  const setDarkPalette = (variant: "blue" | "purple" | "mono") => {
    document.documentElement.setAttribute("data-dark", variant);
    toast({ title: "Theme updated", description: `Dark theme: ${variant}` });
  };

  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full" style={{ background: "radial-gradient(60% 60% at 50% 45%, hsl(256 84% 64%), hsl(190 70% 45%))" }} />
            <span className="font-semibold">Aurify</span>
          </div>
          <p className="text-sm text-muted-foreground">Say it right. Every time.</p>
          <div className="flex items-center gap-2 pt-1" aria-label="Social links">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted/50" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted/50" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted/50" aria-label="X (formerly Twitter)">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/practice">Practice</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" aria-disabled>About</a></li>
            <li><a href="#" aria-disabled>Careers</a></li>
            <li><a href="#" aria-disabled>Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" aria-disabled>Terms</a></li>
            <li><a href="#" aria-disabled>Privacy</a></li>
            <li><a href="#" aria-disabled>Security</a></li>
          </ul>

          <div className="mt-6 space-y-2">
            <h4 className="text-xs font-medium">Language</h4>
            <Select onValueChange={setLanguage}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="中文">Chinese</SelectItem>
                <SelectItem value="العربية">Arabic</SelectItem>
                <SelectItem value="Español">Spanish</SelectItem>
                <SelectItem value="हिन्दी">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 space-y-2">
            <h4 className="text-xs font-medium">Theme</h4>
            <div className="flex items-center gap-2">
              <button onClick={() => setTheme("system")} className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted/50" aria-label="System default">
                <Monitor className="h-4 w-4" />
              </button>
              <button onClick={() => setTheme("light")} className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted/50" aria-label="Light mode">
                <Sun className="h-4 w-4" />
              </button>
              <button onClick={() => setTheme("dark")} className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted/50" aria-label="Dark mode">
                <Moon className="h-4 w-4" />
              </button>
            </div>
            {isDark && (
              <div className="mt-2 flex items-center gap-2" aria-label="Dark theme palettes">
                <button onClick={() => setDarkPalette("blue")} className="h-6 w-6 rounded-md border" style={{ background: "linear-gradient(135deg, hsl(210 90% 60%), hsl(200 70% 45%))" }} aria-label="Blue & Black" />
                <button onClick={() => setDarkPalette("purple")} className="h-6 w-6 rounded-md border" style={{ background: "linear-gradient(135deg, hsl(256 84% 64%), hsl(268 90% 70%))" }} aria-label="Purple & Black" />
                <button onClick={() => setDarkPalette("mono")} className="h-6 w-6 rounded-md border" style={{ background: "linear-gradient(135deg, hsl(0 0% 98%), hsl(0 0% 85%))" }} aria-label="Black & White" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Aurify</div>
    </footer>
  );
};

export default Footer;
