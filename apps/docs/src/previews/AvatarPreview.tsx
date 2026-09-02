import { Avatar } from "@75neo/react";

/** The three fallback cases, then shape and size. */
export function AvatarPreview() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar name="Ada Lovelace" size="lg" />
      <Avatar name="Grace Hopper" size="lg" color="primary" />
      <Avatar name="Alan Turing" size="lg" shape="square" color="success" />
      <Avatar name="Katherine Johnson" size="md" color="warning" />
      <Avatar name="Radia Perlman" size="sm" color="info" />
      <Avatar name="Barbara Liskov" size="xs" color="error" />
    </div>
  );
}
