import { Avatar, AvatarFallback, AvatarImage } from "@/components/react";

export default function AvatarFallbackDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="lg">
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarImage src="https://example.invalid/missing.png" alt="" />
        <AvatarFallback>75</AvatarFallback>
      </Avatar>
    </div>
  );
}
