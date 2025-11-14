import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { usePage, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CheckSquare,
    BarChart3,
    User,
    TrendingUp,
    Clock,
    Target,
    Sparkles,
    ArrowRight,
    CalendarDays,
    Zap,
} from "lucide-react";

export default function HomePage() {
    const { auth, todos } = usePage().props;

    const totalTasks = todos.length;
    const pendingTasks = todos.filter((t) => t.status === "pending").length;
    const inProgressTasks = todos.filter(
        (t) => t.status === "in_progress"
    ).length;
    const completedTasks = todos.filter((t) => t.status === "complete").length;

    const productivity = totalTasks
        ? Math.round((completedTasks / totalTasks) * 100) + "%"
        : "0%";

    const quickStats = [
        {
            title: "Total Tasks",
            value: totalTasks,
            change: "+12%",
            icon: CheckSquare,
            color: "from-indigo-500 to-indigo-600",
            bgColor: "from-indigo-50 to-blue-50",
            borderColor: "border-indigo-100",
        },
        {
            title: "Completed",
            value: completedTasks,
            change: "+8%",
            icon: Target,
            color: "from-emerald-500 to-emerald-600",
            bgColor: "from-emerald-50 to-green-50",
            borderColor: "border-emerald-100",
        },
        {
            title: "In Progress",
            value: inProgressTasks,
            change: "+4%",
            icon: Clock,
            color: "from-amber-500 to-amber-600",
            bgColor: "from-amber-50 to-yellow-50",
            borderColor: "border-amber-100",
        },
        {
            title: "Productivity",
            value: productivity,
            change: "+15%",
            icon: TrendingUp,
            color: "from-purple-500 to-purple-600",
            bgColor: "from-purple-50 to-pink-50",
            borderColor: "border-purple-100",
        },
    ];

    const quickActions = [
        {
            title: "Manage Todos",
            description: "Create and organize your tasks",
            icon: CheckSquare,
            href: "/todos",
            color: "from-indigo-500 to-indigo-600",
            hoverColor: "hover:from-indigo-600 hover:to-indigo-700",
        },
        {
            title: "View Statistics",
            description: "Track your productivity metrics",
            icon: BarChart3,
            href: "/stats",
            color: "from-purple-500 to-purple-600",
            hoverColor: "hover:from-purple-600 hover:to-purple-700",
        },
        {
            title: "Edit Profile",
            description: "Update your account settings",
            icon: User,
            href: "/profile",
            color: "from-pink-500 to-pink-600",
            hoverColor: "hover:from-pink-600 hover:to-pink-700",
        },
    ];

    const recentActivities = todos
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5)
        .map((todo) => ({
            text: `${todo.status === "done" ? "Completed" : "Updated"} task: ${
                todo.title
            }`,
            time: new Date(todo.updated_at).toLocaleString("id-ID"),
            icon: todo.status === "done" ? CheckSquare : Zap,
            color:
                todo.status === "done" ? "text-emerald-500" : "text-indigo-500",
        }));

    const currentDate = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Welcome Hero Section */}
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-500 via-indigo-600 to-indigo-700 p-8 md:p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                                <Sparkles
                                    className="text-white"
                                    size={32}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div>
                                <p className="text-indigo-100 text-sm font-medium">
                                    {currentDate}
                                </p>
                                <h1 className="text-3xl md:text-4xl font-black text-white">
                                    Selamat Datang,{" "}
                                    {auth?.user?.name || "Pengguna"}! 🎉
                                </h1>
                            </div>
                        </div>
                        <p className="text-indigo-100 text-lg max-w-2xl">
                            Kelola tugas Anda dengan mudah dan tingkatkan
                            produktivitas harian. Mari mulai hari yang
                            produktif!
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {quickStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card
                                key={index}
                                className={`backdrop-blur-xl bg-linear-to-br ${stat.bgColor} border ${stat.borderColor} shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                                        >
                                            <Icon
                                                className="text-white"
                                                size={24}
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                            {stat.change}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                                        {stat.title}
                                    </h3>
                                    <p className="text-3xl font-black text-gray-800">
                                        {stat.value}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Zap className="text-indigo-600" size={28} />
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <Link key={index} href={action.href}>
                                    <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                                        <CardContent className="p-6">
                                            <div
                                                className={`w-14 h-14 rounded-2xl bg-linear-to-br ${action.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                                            >
                                                <Icon
                                                    className="text-white"
                                                    size={28}
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                {action.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {action.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                                                <span>Get Started</span>
                                                <ArrowRight size={18} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                        <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl overflow-hidden">
                            <CardHeader className="bg-linear-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                                <CardTitle className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                                        <Clock
                                            className="text-white"
                                            size={20}
                                        />
                                    </div>
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {recentActivities.map((activity, index) => {
                                        const Icon = activity.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                            >
                                                <div
                                                    className={`w-10 h-10 rounded-xl bg-linear-to-br ${activity.color.replace(
                                                        "text-",
                                                        "from-"
                                                    )} to-gray-100 flex items-center justify-center shrink-0`}
                                                >
                                                    <Icon
                                                        className={
                                                            activity.color
                                                        }
                                                        size={18}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-800">
                                                        {activity.text}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Today's Schedule */}
                    <div>
                        <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl overflow-hidden">
                            <CardHeader className="bg-linear-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                                <CardTitle className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <CalendarDays
                                            className="text-white"
                                            size={20}
                                        />
                                    </div>
                                    Today's Focus
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    <div className="p-4 rounded-xl bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                            <span className="text-xs font-bold text-indigo-600">
                                                HIGH PRIORITY
                                            </span>
                                        </div>
                                        <p className="font-semibold text-gray-800">
                                            Complete project proposal
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Due: Today, 5:00 PM
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-linear-to-br from-emerald-50 to-green-50 border border-emerald-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <span className="text-xs font-bold text-emerald-600">
                                                MEDIUM
                                            </span>
                                        </div>
                                        <p className="font-semibold text-gray-800">
                                            Team meeting preparation
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Due: Tomorrow
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-linear-to-br from-amber-50 to-yellow-50 border border-amber-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                            <span className="text-xs font-bold text-amber-600">
                                                LOW
                                            </span>
                                        </div>
                                        <p className="font-semibold text-gray-800">
                                            Review documentation
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Due: This week
                                        </p>
                                    </div>
                                </div>

                                <Link href="/todos">
                                    <Button className="w-full mt-4 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg">
                                        View All Tasks
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
