import ServerSidebar from "@/components/sidebar/server/server-sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-[#3f3f3f] grid grid-cols-[200px_1fr] h-screen">
      <ServerSidebar />
      <main>{children}</main>
    </div>
  );
}
