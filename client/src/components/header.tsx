import { DockNavigation } from "@/components/dock-navigation";

export function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-3"
      data-testid="header"
    >
      <DockNavigation />
    </header>
  );
}
