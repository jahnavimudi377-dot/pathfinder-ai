import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass, Sparkles, Target, TrendingUp, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Compass, title: "Explore Careers", desc: "Discover paths that match your unique skills and passions." },
  { icon: Target, title: "Personalized Matching", desc: "AI-powered recommendations tailored just for you." },
  { icon: TrendingUp, title: "Growth Roadmaps", desc: "Step-by-step plans to reach your dream career." },
  { icon: Sparkles, title: "AI Mentor Chat", desc: "Get guidance anytime from your personal AI career mentor." },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 gradient-primary opacity-90" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur px-4 py-2 rounded-full mb-6 text-primary-foreground/80 text-sm">
            <Sparkles size={16} />
            AI-Powered Career Guidance
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Find Your Perfect<br />Career Path
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Don't let confusion hold you back. Our AI mentor takes you from uncertainty to clarity
            with personalized career recommendations based on your unique skills and interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero-outline"
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 text-lg px-8"
            >
              Get Started <ArrowRight size={20} />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8"
            >
              Explore Careers <Compass size={20} />
            </Button>
          </div>
        </div>
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-foreground/5 animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-primary-foreground/5 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-primary-foreground/5 animate-float" style={{ animationDelay: "2s" }} />
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Your Journey to the <span className="gradient-text">Right Career</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            From confusion to clarity — our platform guides you every step of the way.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center glass-card rounded-2xl p-12">
          <h2 className="text-2xl font-bold mb-4">Ready to discover your path?</h2>
          <p className="text-muted-foreground mb-8">
            It only takes a few minutes to get personalized career recommendations.
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate("/onboarding")} className="text-lg px-10">
            Start Your Journey <ArrowRight size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
