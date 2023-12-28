import MainSidebar from "@/components/sidebar/main/main-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[70px_1fr] h-screen">
      <MainSidebar />
      <main>{children}</main>
    </div>
  );
}
