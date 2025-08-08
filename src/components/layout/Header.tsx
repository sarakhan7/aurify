import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/practice", label: "Practice" },
  { to: "/pricing", label: "Pricing" },
  { to: "/community", label: "Community" },
  { to: "/history", label: "History" },
  { to: "/faq", label: "FAQ" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full" style={{ background: "radial-gradient(60% 60% at 50% 45%, hsl(256 84% 64%), hsl(190 70% 45%))" }} aria-hidden="true" />
          <span className="font-semibold">Aurify</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild variant="hero">
            <Link to="/login">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
