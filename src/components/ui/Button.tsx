import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "success";
  fullWidth?: boolean;
};

export const Button = ({
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "button",
        variant === "outline" && "button--outline",
        variant === "ghost" && "button--ghost",
        variant === "success" && "button--success",
        fullWidth && "button--full",
        className
      )}
      {...props}
    />
  );
};
