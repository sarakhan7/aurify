import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full" style={{ background: "radial-gradient(60% 60% at 50% 45%, hsl(256 84% 64%), hsl(190 70% 45%))" }} />
            <span className="font-semibold">Aurify</span>
          </div>
          <p className="text-sm text-muted-foreground">Say it right. Every time.</p>
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
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Aurify</div>
    </footer>
  );
};

export default Footer;
