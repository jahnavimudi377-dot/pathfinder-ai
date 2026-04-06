import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { generateCareerSuggestions, CareerSuggestion } from "@/lib/careerEngine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import TagInput from "@/components/TagInput";
import { Sparkles, TrendingUp, Target, MessageCircle, ChevronRight, BookOpen, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const { user, updateSkills } = useUser();
  const navigate = useNavigate();
  const [showSkillEditor, setShowSkillEditor] = useState(false);

  const suggestions = useMemo(() => generateCareerSuggestions(user), [user]);

  if (!user.completedOnboarding) {
    navigate("/onboarding");
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      {/* Greeting */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, <span className="gradient-text">{user.name}</span> 👋
        </h1>
        <p className="text-muted-foreground">Here's your personalized career dashboard.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Sparkles, label: "Careers", action: () => navigate("/careers") },
          { icon: MessageCircle, label: "AI Mentor", action: () => navigate("/chat") },
          { icon: Target, label: "My Skills", action: () => setShowSkillEditor(!showSkillEditor) },
          { icon: TrendingUp, label: "Profile", action: () => navigate("/profile") },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <item.icon size={20} className="text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Skill Editor */}
      {showSkillEditor && (
        <div className="glass-card rounded-xl p-6 mb-8 animate-scale-in">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Target size={18} /> Edit Your Skills
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Update your skills to get refreshed career recommendations instantly.
          </p>
          <TagInput tags={user.skills} onChange={updateSkills} placeholder="Add a new skill..." />
        </div>
      )}

      {/* Career Recommendations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles size={20} /> Top Career Matches
          </h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/careers")}>
            View All <ChevronRight size={16} />
          </Button>
        </div>

        {suggestions.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center">
            <AlertCircle size={40} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Add more skills to get career recommendations.</p>
            <Button variant="hero" className="mt-4" onClick={() => setShowSkillEditor(true)}>
              Add Skills
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.slice(0, 3).map((s, i) => (
              <CareerCard key={s.title} suggestion={s} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Progress Overview */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <BookOpen size={18} /> Your Progress
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Profile Completion</span>
              <span className="text-muted-foreground">
                {Math.min(100, Math.round(
                  ((user.skills.length > 0 ? 25 : 0) +
                    (user.interests.length > 0 ? 25 : 0) +
                    (user.strengths.length > 0 ? 25 : 0) +
                    (user.goals.length > 0 ? 25 : 0))
                ))}%
              </span>
            </div>
            <Progress
              value={Math.min(100, Math.round(
                ((user.skills.length > 0 ? 25 : 0) +
                  (user.interests.length > 0 ? 25 : 0) +
                  (user.strengths.length > 0 ? 25 : 0) +
                  (user.goals.length > 0 ? 25 : 0))
              ))}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Skills Added</span>
              <span className="text-muted-foreground">{user.skills.length}</span>
            </div>
            <Progress value={Math.min(100, user.skills.length * 10)} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Careers Explored</span>
              <span className="text-muted-foreground">{suggestions.length}</span>
            </div>
            <Progress value={Math.min(100, suggestions.length * 16)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CareerCard = ({ suggestion, index }: { suggestion: CareerSuggestion; index: number }) => (
  <div
    className="glass-card rounded-xl p-5 hover:scale-[1.02] transition-all duration-300 animate-slide-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-semibold text-lg">{suggestion.title}</h3>
      <Badge variant="secondary" className="gradient-primary text-primary-foreground font-bold">
        {suggestion.matchPercent}%
      </Badge>
    </div>
    <p className="text-sm text-muted-foreground mb-3">{suggestion.whySuitable}</p>
    {suggestion.missingSkills.length > 0 && (
      <div className="mb-2">
        <span className="text-xs text-muted-foreground">Skills to learn:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {suggestion.missingSkills.map((s) => (
            <Badge key={s} variant="outline" className="text-xs">
              {s}
            </Badge>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default Dashboard;
