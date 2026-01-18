import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => {
  return <div className={clsx("card", className)} {...props} />;
};
