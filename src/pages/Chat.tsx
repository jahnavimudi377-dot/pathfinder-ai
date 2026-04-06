import { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { generateCareerSuggestions } from "@/lib/careerEngine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function generateAIResponse(input: string, user: ReturnType<typeof useUser>["user"]): string {
  const name = user.name || "there";
  const skills = user.skills.join(", ") || "not specified yet";
  const interests = user.interests.join(", ") || "not specified yet";
  const goals = user.goals.join(", ") || "not specified yet";
  const suggestions = generateCareerSuggestions(user);
  const topCareer = suggestions[0];

  const lower = input.toLowerCase();

  if (lower.includes("career") || lower.includes("recommend") || lower.includes("job") || lower.includes("path")) {
    if (topCareer) {
      return `Great question, ${name}! Based on your skills in ${skills}, I'd strongly recommend considering **${topCareer.title}** (${topCareer.matchPercent}% match). ${topCareer.whySuitable}\n\nTo strengthen your profile, consider learning: ${topCareer.missingSkills.join(", ") || "you're already well-prepared!"}`;
    }
    return `${name}, I'd love to help you find the right career path! Could you add more skills to your profile? That way I can give you more accurate recommendations.`;
  }

  if (lower.includes("skill") || lower.includes("learn") || lower.includes("improve")) {
    if (topCareer && topCareer.missingSkills.length > 0) {
      return `${name}, based on your goal of becoming a ${topCareer.title}, I'd suggest focusing on these skills:\n\n${topCareer.missingSkills.map((s, i) => `${i + 1}. **${s}**`).join("\n")}\n\nThese will significantly boost your career prospects!`;
    }
    return `${name}, your current skills (${skills}) are solid! Keep building on them. Consider exploring new areas related to your interests: ${interests}.`;
  }

  if (lower.includes("roadmap") || lower.includes("plan") || lower.includes("step")) {
    if (topCareer) {
      return `Here's a roadmap for you, ${name}, to become a **${topCareer.title}**:\n\n${topCareer.roadmap.map((s, i) => `**Step ${i + 1}:** ${s}`).join("\n\n")}\n\nTake it one step at a time — you've got this! 💪`;
    }
    return `${name}, I'd be happy to create a roadmap for you! First, tell me — what career are you most interested in?`;
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return `Hey ${name}! 👋 Great to see you! I'm your AI career mentor. I know you're interested in ${interests} and skilled in ${skills}. How can I help you today? Ask me about careers, skills to learn, or a career roadmap!`;
  }

  if (lower.includes("thank")) {
    return `You're welcome, ${name}! Remember, I'm always here to help you on your career journey. Feel free to ask anything about careers, skills, or your learning roadmap! 🌟`;
  }

  // Default contextual response
  const responses = [
    `That's a great point, ${name}! With your skills in ${skills} and interest in ${interests}, you have a lot of potential. Would you like me to suggest specific career paths or a learning plan?`,
    `Interesting, ${name}! Let me think about this in context of your goals: ${goals}. Would you like career recommendations, skill suggestions, or a step-by-step roadmap?`,
    `${name}, I love your curiosity! Based on your profile, I think you'd excel in ${topCareer ? topCareer.title : "several exciting fields"}. Want me to dive deeper into any specific career?`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

const Chat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hey ${user.name || "there"}! 👋 I'm your AI career mentor. I can see you're skilled in ${user.skills.join(", ") || "some great areas"}. Ask me about career paths, skills to develop, or I can create a personalized roadmap for you!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(userMsg.content, user);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const quickPrompts = [
    "What career suits me?",
    "What skills should I learn?",
    "Give me a career roadmap",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Sparkles size={22} className="text-primary" /> AI Career Mentor
        </h1>
        <p className="text-sm text-muted-foreground">Your personal career guidance assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 animate-fade-in ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant" ? "gradient-primary" : "bg-muted"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot size={16} className="text-primary-foreground" />
              ) : (
                <User size={16} className="text-muted-foreground" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "gradient-primary text-primary-foreground"
                  : "glass-card"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Bot size={16} className="text-primary-foreground" />
            </div>
            <div className="glass-card rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {quickPrompts.map((p) => (
            <Button
              key={p}
              variant="outline"
              size="sm"
              onClick={() => {
                setInput(p);
                setTimeout(() => {
                  setInput("");
                  const userMsg: Message = { role: "user", content: p };
                  setMessages((prev) => [...prev, userMsg]);
                  setIsTyping(true);
                  setTimeout(() => {
                    const response = generateAIResponse(p, user);
                    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
                    setIsTyping(false);
                  }, 800);
                }, 100);
              }}
              className="text-xs"
            >
              {p}
            </Button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={`Ask me anything, ${user.name || ""}...`}
            className="flex-1"
            disabled={isTyping}
          />
          <Button variant="hero" size="icon" onClick={sendMessage} disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
