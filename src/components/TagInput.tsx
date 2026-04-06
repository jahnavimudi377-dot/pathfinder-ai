import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput = ({ tags, onChange, placeholder = "Type and press Enter..." }: TagInputProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput("");
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-input bg-background min-h-[48px] focus-within:ring-2 focus-within:ring-ring transition-all">
      {tags.map((tag, i) => (
        <Badge key={i} variant="secondary" className="gap-1 px-3 py-1 animate-scale-in">
          {tag}
          <button onClick={() => removeTag(i)} className="ml-1 hover:text-destructive transition-colors">
            <X size={14} />
          </button>
        </Badge>
      ))}
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : "Add more..."}
        className="flex-1 min-w-[120px] border-0 p-0 h-auto focus-visible:ring-0 shadow-none"
      />
    </div>
  );
};

export default TagInput;
