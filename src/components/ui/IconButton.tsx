import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ className, ...props }: IconButtonProps) => {
  return <button className={clsx("icon-button", className)} {...props} />;
};
