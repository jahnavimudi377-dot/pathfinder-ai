import { useUser } from "@/context/UserContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TagInput from "@/components/TagInput";
import { User, Heart, Zap, Target, Code, Edit3, Save } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Profile = () => {
  const { user, setUser, updateSkills } = useUser();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [interests, setInterests] = useState(user.interests);
  const [strengths, setStrengths] = useState(user.strengths);
  const [goals, setGoals] = useState(user.goals);

  if (!user.completedOnboarding) {
    navigate("/onboarding");
    return null;
  }

  const handleSave = () => {
    setUser((prev) => ({ ...prev, name: name.trim(), interests, strengths, goals }));
    setEditing(false);
    toast.success("Profile updated! Career recommendations refreshed.");
  };

  const sections = [
    { icon: Heart, label: "Interests", items: editing ? undefined : user.interests, editComponent: editing ? <TagInput tags={interests} onChange={setInterests} /> : null },
    { icon: Zap, label: "Strengths", items: editing ? undefined : user.strengths, editComponent: editing ? <TagInput tags={strengths} onChange={setStrengths} /> : null },
    { icon: Target, label: "Goals", items: editing ? undefined : user.goals, editComponent: editing ? <TagInput tags={goals} onChange={setGoals} /> : null },
    { icon: Code, label: "Skills", items: undefined, editComponent: <TagInput tags={user.skills} onChange={updateSkills} placeholder="Add a skill..." /> },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
      <div className="glass-card rounded-2xl p-8 mb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
              <User size={32} className="text-primary-foreground" />
            </div>
            <div>
              {editing ? (
                <Input value={name} onChange={(e) => setName(e.target.value)} className="text-2xl font-bold h-auto py-1" />
              ) : (
                <h1 className="text-2xl font-bold">{user.name}</h1>
              )}
              <p className="text-muted-foreground text-sm">Career Explorer</p>
            </div>
          </div>
          {editing ? (
            <Button variant="hero" size="sm" onClick={handleSave}>
              <Save size={16} /> Save
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              <Edit3 size={16} /> Edit
            </Button>
          )}
        </div>

        {sections.map((s) => (
          <div key={s.label} className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
              <s.icon size={16} /> {s.label}
            </h3>
            {s.editComponent ? (
              s.editComponent
            ) : s.items ? (
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <Badge key={item} variant="secondary">{item}</Badge>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
