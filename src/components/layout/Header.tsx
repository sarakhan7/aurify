import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const links = [
  { to: "/practice", label: "Practice" },
  { to: "/pricing", label: "Pricing" },
  { to: "/community", label: "Community" },
  { to: "/history", label: "History" },
  { to: "/faq", label: "FAQ" },
];

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'email';
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('aurify_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('aurify_user');
    localStorage.removeItem('aurify_auth_token');
    localStorage.removeItem('aurify_guest');
    setUser(null);
    window.location.reload();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full" style={{ background: "radial-gradient(60% 60% at 50% 45%, hsl(256 84% 64%), hsl(190 70% 45%))" }} aria-hidden="true" />
          <span className="font-semibold">Aurify</span>
        </Link>
        
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <NavLink 
              key={l.to} 
              to={l.to} 
              className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/profile">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild variant="hero" size="sm">
                <Link to="/login">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
