import NavSidebar from "@/components/navigation/nav-sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[70px_1fr] h-screen">
      <NavSidebar />
      <main>{children}</main>
    </div>
  );
}
