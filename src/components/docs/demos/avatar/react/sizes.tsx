import { Avatar, AvatarFallback, AvatarImage } from "@/components/react";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function AvatarSizes() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={`https://picsum.photos/seed/75neo-${size}/160/160`} alt="" />
          <AvatarFallback>75</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
