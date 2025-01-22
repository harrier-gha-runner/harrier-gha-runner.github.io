import { useState } from "react";

export const CodeBlock = ({
  children,
  canCopy = true,
}: {
  children: string;
  canCopy?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  async function copyToClipboard() {
    if (!canCopy) return;
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setShowCopiedMessage(true);
      setTimeout(() => {
        setCopied(false);
        setShowCopiedMessage(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <>
      <span
        className={`code-block ${copied ? "bg-harrierBLUE" : ""} ${canCopy ? "cursor-pointer" : "cursor-default"}`}
        onClick={canCopy ? copyToClipboard : undefined}
      >
        {children}
      </span>
      {showCopiedMessage && (
        <div className="fixed bottom-4 right-4 z-50 rounded bg-harrierBLACK bg-opacity-75 px-4 py-2 text-white">
          copied
        </div>
      )}
    </>
  );
};
