"use client";

import { logout } from "@/lib/actions"; // Correct import
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <Button
      variant="destructive"
      className="flex w-full items-center gap-2"
      onClick={() => logout()}
    >
      <LogOut size={16} />
      Log Out
    </Button>
  );
}
