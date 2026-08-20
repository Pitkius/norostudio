"use client";

import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import classNames from "classnames";

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
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-paper-raised/40 border-t-paper-raised" />
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
        "w-full border border-ink/15 bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-mute/70 focus:border-moss focus:ring-2 focus:ring-moss/15",
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
        "w-full border border-ink/15 bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-mute/70 focus:border-moss focus:ring-2 focus:ring-moss/15",
        className
      )}
      {...rest}
    />
  );
}
