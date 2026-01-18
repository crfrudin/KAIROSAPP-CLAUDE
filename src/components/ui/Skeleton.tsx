import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx("skeleton", className)} {...props} />;
};
