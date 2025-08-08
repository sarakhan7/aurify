import { NavLink } from "react-router-dom";
import { Home, PlayCircle, History, HelpCircle } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/practice", label: "Practice", icon: PlayCircle },
  { to: "/history", label: "History", icon: History },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
];

const BottomNav = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 text-xs transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`
              }
              aria-label={label}
            >
              <Icon className="mb-1 h-5 w-5" aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
