import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "primary" | "danger";
};

export const Badge = ({ variant = "default", className, ...props }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "badge",
        variant === "primary" && "badge--primary",
        variant === "danger" && "badge--danger",
        className
      )}
      {...props}
    />
  );
};
