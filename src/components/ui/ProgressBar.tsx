import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  muted?: boolean;
};

export const ProgressBar = ({ value, muted = false, className, ...props }: ProgressBarProps) => {
  const width = Math.min(100, Math.max(0, value));
  return (
    <div className={clsx("progress", className)} {...props}>
      <div
        className={clsx("progress__bar", muted && "progress__bar--muted")}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
