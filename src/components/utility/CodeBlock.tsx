import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

export const CodeBlock = ({
  children,
  canCopy,
}: {
  children: string;
  canCopy?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  //   const { toast } = useToast();

  async function copyToClipboard() {
    if (!canCopy) return;
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      //   toast({
      //     title: "Copied to clipboard",
      //     description: children,
      //   });

      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <span
      className={`code-block ${copied ? "bg-harrierBLUE" : ""}`}
      onClick={canCopy ? copyToClipboard : undefined}
      style={{ cursor: canCopy ? "pointer" : "default" }}
    >
      {children}
    </span>
  );
};
