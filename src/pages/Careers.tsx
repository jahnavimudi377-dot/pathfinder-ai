import { useMemo, useState } from "react";
import { useUser } from "@/context/UserContext";
import { generateCareerSuggestions, CareerSuggestion } from "@/lib/careerEngine";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Sparkles, BookOpen, AlertTriangle, CheckCircle } from "lucide-react";

const Careers = () => {
  const { user } = useUser();
  const suggestions = useMemo(() => generateCareerSuggestions(user), [user]);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Sparkles size={28} /> Career Recommendations
        </h1>
        <p className="text-muted-foreground">
          Based on your skills, interests, and goals, {user.name}.
        </p>
      </div>

      {suggestions.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <AlertTriangle size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No matches yet</h3>
          <p className="text-muted-foreground">Add more skills from the dashboard to see career recommendations.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map((s, i) => (
            <CareerDetailCard key={s.title} suggestion={s} index={i} userName={user.name} />
          ))}
        </div>
      )}
    </div>
  );
};

const CareerDetailCard = ({
  suggestion,
  index,
  userName,
}: {
  suggestion: CareerSuggestion;
  index: number;
  userName: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass-card rounded-xl overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            #{index + 1}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{suggestion.title}</h3>
            <p className="text-sm text-muted-foreground">{suggestion.whySuitable.slice(0, 80)}...</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gradient-primary text-primary-foreground font-bold text-lg px-4 py-1">
            {suggestion.matchPercent}%
          </Badge>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 space-y-4 animate-fade-in">
          <div className="border-t border-border pt-4">
            <h4 className="font-semibold mb-2">Why this suits you, {userName}</h4>
            <p className="text-muted-foreground">{suggestion.whySuitable}</p>
          </div>

          {suggestion.missingSkills.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle size={16} /> Skills to Develop
              </h4>
              <div className="flex flex-wrap gap-2">
                {suggestion.missingSkills.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <BookOpen size={16} /> Learning Roadmap
            </h4>
            <div className="space-y-2">
              {suggestion.roadmap.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary-foreground font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
