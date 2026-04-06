import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  name: string;
  interests: string[];
  strengths: string[];
  goals: string[];
  skills: string[];
  completedOnboarding: boolean;
}

interface UserContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateSkills: (skills: string[]) => void;
}

const defaultUser: UserProfile = {
  name: "",
  interests: [],
  strengths: [],
  goals: [],
  skills: [],
  completedOnboarding: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("careerUser");
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const updateUser = (val: React.SetStateAction<UserProfile>) => {
    setUser((prev) => {
      const next = typeof val === "function" ? val(prev) : val;
      localStorage.setItem("careerUser", JSON.stringify(next));
      return next;
    });
  };

  const updateSkills = (skills: string[]) => {
    updateUser((prev) => ({ ...prev, skills }));
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, updateSkills }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
};
