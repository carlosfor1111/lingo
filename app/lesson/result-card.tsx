import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCard = ({ value, variant }: Props) => {
  const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg";

  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "hearts" && "bg-rose-400 border-rose-400"
      )}
    >
      
    </div>
  );
};
