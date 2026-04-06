import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RotateCcw, Trash2, Settings as SettingsIcon } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleReset = () => {
    setUser({
      name: "",
      interests: [],
      strengths: [],
      goals: [],
      skills: [],
      completedOnboarding: false,
    });
    localStorage.removeItem("careerUser");
    toast.success("All data has been reset.");
    navigate("/");
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon size={28} /> Settings
        </h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <div className="glass-card rounded-xl p-6 mb-4">
        <h3 className="font-semibold mb-2">Restart Onboarding</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Go through the onboarding process again to update all your information.
        </p>
        <Button variant="outline" onClick={() => navigate("/onboarding")}>
          <RotateCcw size={16} /> Restart Onboarding
        </Button>
      </div>

      <div className="glass-card rounded-xl p-6 border-destructive/30">
        <h3 className="font-semibold mb-2 text-destructive">Reset All Data</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This will delete all your profile data and career recommendations permanently.
        </p>
        <Button variant="destructive" onClick={handleReset}>
          <Trash2 size={16} /> Reset Everything
        </Button>
      </div>
    </div>
  );
};

export default Settings;
