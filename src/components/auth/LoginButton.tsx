"use client";

import { Loader2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { useLinkedInAuth } from "@/lib/hooks/useLinkedInAuth";
import { cn } from "@/lib/utils";

interface LoginButtonProps {
  label: string;
  className?: string;
  disabled?: boolean;
  onSuccess?: () => void | Promise<void>;
}

export function LoginButton({
  label,
  className,
  disabled = false,
  onSuccess,
}: LoginButtonProps) {
  const { isLoading, loginWithLinkedIn } = useLinkedInAuth({ onSuccess });

  return (
    <button
      type="button"
      onClick={loginWithLinkedIn}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0a66c2] px-4 text-sm font-semibold text-white transition hover:bg-[#07559f] disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
    >
      {isLoading ? (
        <Loader2 size={17} className="animate-spin" />
      ) : (
        <FaLinkedin size={17} />
      )}
      {label}
    </button>
  );
}
