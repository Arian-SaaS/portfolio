import type React from "react";
import { cn } from "@/lib/utils";

interface DarkGradientBgProps {
  children?: React.ReactNode;
  className?: string;
}

export function DarkGradientBg({ children, className }: DarkGradientBgProps) {
  return (
    <div
      className={cn(
        "dark-pattern-background relative min-h-screen w-full overflow-x-hidden bg-background",
        className,
      )}
    >
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background: "var(--dark-pattern-base)",
            mask: "radial-gradient(125% 100% at 0% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.224) 88.2883%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          {/* Skewed fading blue streaks */}
          <div
            className="dark-pattern-streak absolute inset-0 opacity-20"
            style={{
              background: "var(--dark-pattern-streak)",
              mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 36%, rgb(0, 0, 0) 55%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 78%, rgba(0, 0, 0, 0) 97%)",
              transform: "skewX(45deg)",
            }}
          />
          <div
            className="dark-pattern-streak absolute inset-0 opacity-20"
            style={{
              background: "var(--dark-pattern-streak)",
              mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 11%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0.55) 41%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 78%, rgba(0, 0, 0, 0) 97%)",
              transform: "skewX(45deg)",
            }}
          />
          <div
            className="dark-pattern-streak absolute inset-0 opacity-20"
            style={{
              background: "var(--dark-pattern-streak)",
              mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 9%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 28%, rgba(0, 0, 0, 0.424) 40%, rgb(0, 0, 0) 48%, rgba(0, 0, 0, 0.267) 54%, rgba(0, 0, 0, 0.13) 78%, rgb(0, 0, 0) 88%, rgba(0, 0, 0, 0) 97%)",
              transform: "skewX(45deg)",
            }}
          />
          <div
            className="dark-pattern-streak absolute inset-0 opacity-20"
            style={{
              background: "var(--dark-pattern-streak)",
              mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 17%, rgba(0, 0, 0, 0.55) 26%, rgb(0, 0, 0) 35%, rgba(0, 0, 0, 0) 47%, rgba(0, 0, 0, 0.13) 69%, rgb(0, 0, 0) 79%, rgba(0, 0, 0, 0) 97%)",
              transform: "skewX(45deg)",
            }}
          />
          <div
            className="dark-pattern-streak absolute inset-0 opacity-20"
            style={{
              background: "var(--dark-pattern-streak)",
              mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 27%, rgb(0, 0, 0) 42%, rgba(0, 0, 0, 0) 48%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 74%, rgb(0, 0, 0) 82%, rgba(0, 0, 0, 0.47) 88%, rgba(0, 0, 0, 0) 97%)",
              transform: "skewX(45deg)",
            }}
          />
        </div>
      </div>

      <div
        className="dark-pattern-texture fixed inset-0 bg-repeat"
        style={{
          backgroundImage:
            'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")',
          backgroundSize: "149.76px",
        }}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: "var(--dark-pattern-dot)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0"
        style={{
          background: "var(--dark-pattern-highlight)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
}

export default DarkGradientBg;
