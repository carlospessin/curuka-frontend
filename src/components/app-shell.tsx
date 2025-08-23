import React, { createContext, useContext, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface AppShellProps {
    children: React.ReactNode;
}

interface SidebarContextType {
    isOpen: boolean;
    toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
    isOpen: false,
    toggle: () => { },
});

export const useSidebar = () => useContext(SidebarContext);

export function AppShell({ children }: AppShellProps) {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <SidebarContext.Provider value={{ isOpen, toggle }}>
            <div className="flex flex-col min-h-screen">
                {/* Header fixo */}
                <div className="fixed top-0 left-0 right-0 z-50">
                    <Header />
                </div>

                {/* Conteúdo + Sidebar */}
                <div className="flex flex-1 pt-16"> {/* pt-16 = altura do header */}
                    {/* Conteúdo principal */}
                    <main className="flex-1 p-4 relative">
                        {children}
                    </main>
                </div>
            </div>
            <Footer />
        </SidebarContext.Provider>
    );
}
