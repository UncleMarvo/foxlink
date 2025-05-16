"use client";
import { toast } from "sonner";
import ShareProfileLink from "@/components/ShareProfileLink";

export default function ShareProfileLinkWrapper({ username }: { username: string }) {
  return (
    <ShareProfileLink
      username={username}
      onSuccess={(msg) => toast.success(msg)}
    />
  );
} 