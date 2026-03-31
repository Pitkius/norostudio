"use client";

import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import classNames from "classnames";
import { useTheme } from "./theme-provider";

export function Container({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="section-padding">
      <div className="container-main">{children}</div>
    </section>
  );
}

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline"; loading?: boolean }
) {
  const { variant = "primary", loading, className, children, ...rest } = props;
  return (
    <button
      className={classNames(
        variant === "primary" ? "btn-primary" : "btn-outline",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-600" />
      )}
      {children}
    </button>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      className={classNames(
        "w-full rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-slate-100 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-300/25",
        className
      )}
      {...rest}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return (
    <textarea
      className={classNames(
        "w-full rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-slate-100 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-300/25",
        className
      )}
      {...rest}
    />
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      aria-label="Perjungti temą"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-muted-light bg-white/80 text-sm shadow-sm transition hover:border-primary hover:text-primary dark:border-muted-dark dark:bg-slate-900/80"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4 11a1 1 0 0 1 1 1 1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1Zm18 0a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1ZM5.64 5.64a1 1 0 0 1 1.41 0l.71.71a1 1 0 1 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41Zm12.02 12.02a1 1 0 0 1 1.41 0l.71.71a1 1 0 1 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41Zm1.41-12.02a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM7.76 17.66a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0Z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M21 15.5A8.5 8.5 0 0 1 8.5 3a7 7 0 1 0 12.5 12.5Z"
      />
    </svg>
  );
}

