import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSEO } from "@/hooks/use-seo";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, User, Lock } from "lucide-react";
import { Chrome } from "lucide-react";

// Mock authentication hook - replace with real OAuth provider
const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Mock Google sign-in
      const mockUser = {
        id: 'google_' + Math.random().toString(36).substr(2, 9),
        email: 'demo.user@gmail.com',
        name: 'Demo User',
        avatar: null,
        provider: 'google',
        createdAt: new Date().toISOString()
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data
      localStorage.setItem('aurify_user', JSON.stringify(mockUser));
      localStorage.setItem('aurify_auth_token', 'mock_google_token_' + Math.random().toString(36).substr(2, 16));
      
      return mockUser;
    } catch (error) {
      throw new Error('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock email sign-in
      const mockUser = {
        id: 'email_' + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        avatar: null,
        provider: 'email',
        createdAt: new Date().toISOString()
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('aurify_user', JSON.stringify(mockUser));
      localStorage.setItem('aurify_auth_token', 'mock_email_token_' + Math.random().toString(36).substr(2, 16));
      
      return mockUser;
    } catch (error) {
      throw new Error('Failed to sign in with email');
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Mock email sign-up
      const mockUser = {
        id: 'email_' + Math.random().toString(36).substr(2, 9),
        email,
        name,
        avatar: null,
        provider: 'email',
        createdAt: new Date().toISOString()
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('aurify_user', JSON.stringify(mockUser));
      localStorage.setItem('aurify_auth_token', 'mock_email_token_' + Math.random().toString(36).substr(2, 16));
      
      return mockUser;
    } catch (error) {
      throw new Error('Failed to sign up with email');
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    loading
  };
};

const Login = () => {
  useSEO({ 
    title: "Log in / Sign up – Aurify", 
    description: "Access Aurify to practice and save your progress with Google OAuth or email." 
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, loading } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      toast({ 
        title: "Welcome back!", 
        description: `Signed in as ${user.name}` 
      });
      navigate("/");
    } catch (error) {
      toast({ 
        title: "Sign in failed", 
        description: "Please try again later", 
        variant: "destructive" 
      });
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({ 
        title: "Missing information", 
        description: "Please fill in all fields", 
        variant: "destructive" 
      });
      return;
    }

    try {
      const user = isSignUp 
        ? await signUpWithEmail(email, password, name)
        : await signInWithEmail(email, password);
      
      toast({ 
        title: isSignUp ? "Account created!" : "Welcome back!", 
        description: `Signed in as ${user.name}` 
      });
      navigate("/");
    } catch (error) {
      toast({ 
        title: isSignUp ? "Sign up failed" : "Sign in failed", 
        description: "Please check your credentials and try again", 
        variant: "destructive" 
      });
    }
  };

  const handleGuestMode = () => {
    localStorage.setItem("aurify_guest", "1");
    toast({ 
      title: "Guest mode activated", 
      description: "You can explore all features. No login required." 
    });
    navigate("/");
  };

  return (
    <main className="container mx-auto max-w-md px-4 pb-24 pt-10">
      <Card className="border-0 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription>
            {isSignUp 
              ? "Join thousands improving their communication skills" 
              : "Sign in to save your progress and access premium features"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Google Sign In */}
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Continue with Google
            </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Auth Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required={isSignUp}
                />
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
                minLength={6}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Button
              variant="ghost"
              className="w-full text-sm"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"}
            </Button>
            
            <Button
              variant="ghost"
              className="w-full text-sm text-muted-foreground"
              onClick={handleGuestMode}
            >
              Continue as Guest
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
