import MainLayoutSidebar from "@/components/sidebar/main-sidebar/main-layout-sidebar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[70px_1fr] h-screen">
      <MainLayoutSidebar />
      <main>{children}</main>
    </div>
  );
}
