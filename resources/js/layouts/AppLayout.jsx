import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    CheckSquare,
    X,
    Menu,
    LogOut,
    Home,
    BarChart3,
    User,
    Sparkles,
    ChevronLeft,
} from "lucide-react";

export default function AppLayout({ children }) {
    const { props, url } = usePage();
    const { auth } = props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const onLogout = () => {
        router.get("/auth/logout");
    };

    const menu = [
        { name: "Home", href: "/", icon: Home },
        { name: "Todos", href: "/todos", icon: CheckSquare },
        { name: "Stats", href: "/stats", icon: BarChart3 },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <div
            className="min-h-screen flex"
            style={{
                background:
                    "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #e0e7ff 100%)",
            }}
        >
            {/* Sidebar Desktop */}
            <aside
                className={`hidden lg:flex lg:flex-col bg-white/95 backdrop-blur-xl shadow-2xl border-r border-indigo-200/50 transition-all duration-300 ${
                    sidebarOpen ? "w-80" : "w-0 overflow-hidden"
                }`}
            >
                <div className="p-8 flex flex-col h-full w-80">
                    {/* Close Button Desktop */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="self-end mb-4 p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Logo */}
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 via-indigo-600 to-indigo-700 flex items-center justify-center shadow-xl">
                                <Sparkles
                                    className="text-white"
                                    size={28}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                    DelTodos
                                </h1>
                                <p className="text-xs font-medium text-indigo-400">
                                    Smart Task Manager
                                </p>
                            </div>
                        </div>

                        {/* User Card */}
                        <div className="p-4 rounded-2xl bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {auth?.user?.name
                                        ?.charAt(0)
                                        .toUpperCase() || "G"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-indigo-400">
                                        Welcome back,
                                    </p>
                                    <p className="text-sm font-bold text-gray-800 truncate">
                                        {auth?.user?.name || "Guest"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menu.map((item) => {
                            const isActive = url === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                                        isActive
                                            ? "bg-linear-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                                            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                                >
                                    <Icon
                                        size={22}
                                        className={
                                            isActive
                                                ? ""
                                                : "group-hover:scale-110 transition-transform"
                                        }
                                    />
                                    <span className="text-sm">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <Button
                        onClick={onLogout}
                        className="mt-6 w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-2xl shadow-lg shadow-red-500/30 h-12 gap-2"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </Button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 lg:hidden ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-6 flex flex-col h-full">
                    {/* Close Button Mobile */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="self-end mb-4 p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    >
                        <X size={24} />
                    </button>

                    {/* Logo */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 via-indigo-600 to-indigo-700 flex items-center justify-center shadow-xl">
                                <Sparkles
                                    className="text-white"
                                    size={28}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                    DelTodos
                                </h1>
                                <p className="text-xs font-medium text-indigo-400">
                                    Smart Task Manager
                                </p>
                            </div>
                        </div>

                        {/* User Card */}
                        <div className="p-4 rounded-2xl bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {auth?.user?.name
                                        ?.charAt(0)
                                        .toUpperCase() || "G"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-indigo-400">
                                        Welcome back,
                                    </p>
                                    <p className="text-sm font-bold text-gray-800 truncate">
                                        {auth?.user?.name || "Guest"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menu.map((item) => {
                            const isActive = url === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all ${
                                        isActive
                                            ? "bg-linear-to-r from-indigo-500 to-indigo-600 text-white shadow-lg"
                                            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <Icon size={22} />
                                    <span className="text-sm">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <Button
                        onClick={onLogout}
                        className="mt-6 w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-2xl shadow-lg h-12 gap-2"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </Button>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 rounded-xl bg-white/50 text-indigo-600 hover:bg-white shadow-md transition-all"
                                >
                                    <Menu size={24} />
                                </button>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                        {url === "/"
                                            ? "Dashboard"
                                            : menu.find((m) => m.href === url)
                                                  ?.name || "Page"}
                                    </h1>
                                    <p className="text-xs sm:text-sm text-indigo-400 font-medium">
                                        {new Date().toLocaleDateString(
                                            "id-ID",
                                            {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                            }
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                                    {auth?.user?.name
                                        ?.charAt(0)
                                        .toUpperCase() || "G"}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="h-full">{children}</div>
                </main>
            </div>
        </div>
    );
}
