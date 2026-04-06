import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/TagInput";
import { useUser } from "@/context/UserContext";
import { ArrowRight, ArrowLeft, User, Heart, Zap, Target, Code, CheckCircle } from "lucide-react";

const steps = [
  { icon: User, label: "Your Name", description: "Let's start with your name so we can personalize your experience." },
  { icon: Heart, label: "Interests", description: "What topics or fields excite you?" },
  { icon: Zap, label: "Strengths", description: "What are you naturally good at?" },
  { icon: Target, label: "Goals", description: "What do you want to achieve in your career?" },
  { icon: Code, label: "Skills", description: "Add your skills — type anything and press Enter." },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [interests, setInterests] = useState<string[]>(user.interests);
  const [strengths, setStrengths] = useState<string[]>(user.strengths);
  const [goals, setGoals] = useState<string[]>(user.goals);
  const [skills, setSkills] = useState<string[]>(user.skills);

  const canProceed = () => {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return interests.length > 0;
    if (step === 2) return strengths.length > 0;
    if (step === 3) return goals.length > 0;
    if (step === 4) return skills.length > 0;
    return false;
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setUser({
        name: name.trim(),
        interests,
        strengths,
        goals,
        skills,
        completedOnboarding: true,
      });
      navigate("/dashboard");
    }
  };

  const StepIcon = steps[step].icon;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  i <= step ? "gradient-primary" : "bg-muted"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Step Card */}
        <div className="glass-card rounded-2xl p-8 animate-fade-in" key={step}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <StepIcon size={20} className="text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Step {step + 1} of 5</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{steps[step].label}</h2>
          <p className="text-muted-foreground mb-6">{steps[step].description}</p>

          {step === 0 && (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="text-lg h-12"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && canProceed() && handleNext()}
            />
          )}
          {step === 1 && (
            <TagInput tags={interests} onChange={setInterests} placeholder="e.g., Technology, Art, Science..." />
          )}
          {step === 2 && (
            <TagInput tags={strengths} onChange={setStrengths} placeholder="e.g., Problem solving, Communication..." />
          )}
          {step === 3 && (
            <TagInput tags={goals} onChange={setGoals} placeholder="e.g., Get a tech job, Start a business..." />
          )}
          {step === 4 && (
            <TagInput tags={skills} onChange={setSkills} placeholder="e.g., React, Python, Writing..." />
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={() => (step > 0 ? setStep(step - 1) : navigate("/"))}
            >
              <ArrowLeft size={18} /> Back
            </Button>
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {step === 4 ? (
                <>
                  <CheckCircle size={18} /> See My Careers
                </>
              ) : (
                <>
                  Continue <ArrowRight size={18} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
