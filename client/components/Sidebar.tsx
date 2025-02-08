"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-60 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <nav className="flex-1">
        <ul>
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                pathname === "/dashboard" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              <Home className="w-5 h-5" /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                pathname === "/dashboard/settings"
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <Settings className="w-5 h-5" /> Settings
            </Link>
          </li>
        </ul>
      </nav>
      <Button variant="destructive" onClick={() => signOut()}>
        <LogOut className="w-5 h-5 mr-2" /> Logout
      </Button>
    </div>
  );
};

export default Sidebar;
