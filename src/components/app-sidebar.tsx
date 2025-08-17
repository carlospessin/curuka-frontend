import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, Folder, BookOpen } from "lucide-react";
import AppLogo from "./app-logo";

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: "Repository",
        href: "https://github.com/laravel/react-starter-kit",
        icon: Folder,
    },
    {
        title: "Documentation",
        href: "https://laravel.com/docs/starter-kits#react",
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <aside className="flex flex-col w-64 bg-gray-100 dark:bg-gray-800 h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                <Link to="/dashboard">
                    <AppLogo />
                </Link>
            </div>

            {/* Main Nav */}
            <nav className="flex-1 p-4 space-y-2">
                {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Nav */}
            <div className="p-4 border-t border-gray-300 dark:border-gray-700 mt-auto space-y-2">
                {footerNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.title}</span>
                        </a>
                    );
                })}
            </div>
        </aside>
    );
}
