import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    TrendingUp,
    TrendingDown,
    CheckCircle2,
    Clock,
    Calendar,
    Target,
    Award,
    Zap,
    BarChart3,
    PieChart,
    Activity,
} from "lucide-react";

export default function Stats() {
    const { todos } = usePage().props;

    const totalTasks = todos.length;
    const completedTasks = todos.filter(
        (todo) => todo.status === "complete"
    ).length;
    const inProgressTasks = todos.filter(
        (todo) => todo.status === "in_progress"
    ).length;
    const pendingTasks = todos.filter(
        (todo) => todo.status === "pending"
    ).length;
    const completionRate =
        totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

    const overallStats = [
        {
            title: "Total Tasks",
            value: totalTasks,
            change: "+0%",
            trend: "up",
            icon: CheckCircle2,
            color: "from-indigo-500 to-indigo-600",
            bgColor: "from-indigo-50 to-blue-50",
            textColor: "text-indigo-600",
        },
        {
            title: "Completed",
            value: completedTasks,
            change: "+0%",
            trend: "up",
            icon: Target,
            color: "from-emerald-500 to-emerald-600",
            bgColor: "from-emerald-50 to-green-50",
            textColor: "text-emerald-600",
        },
        {
            title: "In Progress",
            value: inProgressTasks,
            change: "+0%",
            trend: "up",
            icon: Clock,
            color: "from-amber-500 to-amber-600",
            bgColor: "from-amber-50 to-yellow-50",
            textColor: "text-amber-600",
        },
        {
            title: "Pending",
            value: pendingTasks,
            change: "+0%",
            trend: "down",
            icon: Calendar,
            color: "from-rose-500 to-rose-600",
            bgColor: "from-rose-50 to-pink-50",
            textColor: "text-rose-600",
        },
    ];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyData = daysOfWeek.map((day) => {
        const dayTasks = todos.filter((todo) => {
            const date = new Date(todo.created_at); // atau due_date
            return date.getDay() === daysOfWeek.indexOf(day);
        });
        const completed = dayTasks.filter((t) => t.completed).length;
        const pending = dayTasks.length - completed;
        return { day, completed, pending };
    });

    const categoryMap = {};
    todos.forEach((todo) => {
        const cat = todo.category || "Other";
        if (!categoryMap[cat]) categoryMap[cat] = 0;
        categoryMap[cat]++;
    });
    const total = todos.length;
    const categoryStats = Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value,
        percentage: ((value / total) * 100).toFixed(0),
        color: "bg-indigo-500", // bisa dibuat map sesuai kategori
    }));

    const productivityData = [
        { time: "6-9 AM", tasks: 8, color: "bg-indigo-400" },
        { time: "9-12 PM", tasks: 15, color: "bg-indigo-500" },
        { time: "12-3 PM", tasks: 12, color: "bg-indigo-500" },
        { time: "3-6 PM", tasks: 18, color: "bg-indigo-600" },
        { time: "6-9 PM", tasks: 10, color: "bg-indigo-500" },
        { time: "9-12 AM", tasks: 4, color: "bg-indigo-400" },
    ];

    const achievements = [
        {
            title: "Streak Master",
            description: "7 days in a row",
            icon: Zap,
            color: "from-amber-500 to-amber-600",
        },
        {
            title: "Task Champion",
            description: "100+ tasks completed",
            icon: Award,
            color: "from-purple-500 to-purple-600",
        },
        {
            title: "Early Bird",
            description: "Most productive in AM",
            icon: TrendingUp,
            color: "from-emerald-500 to-emerald-600",
        },
        {
            title: "Consistent",
            description: "Daily task completion",
            icon: Calendar,
            color: "from-indigo-500 to-indigo-600",
        },
    ];

    const maxValue = Math.max(
        ...weeklyData.map((d) => d.completed + d.pending)
    );

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            <span>📊</span>{" "}
                            <span className="bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                Statistics & Analytics
                            </span>
                        </h1>

                        <p className="text-gray-600">
                            Track your productivity and progress over time
                        </p>
                    </div>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {overallStats.map((stat, index) => {
                        const Icon = stat.icon;
                        const TrendIcon =
                            stat.trend === "up" ? TrendingUp : TrendingDown;
                        return (
                            <Card
                                key={index}
                                className={`backdrop-blur-xl bg-linear-to-br ${stat.bgColor} border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
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
                                        <div
                                            className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                                                stat.trend === "up"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-red-50 text-red-600"
                                            }`}
                                        >
                                            <TrendIcon size={14} />
                                            <span className="text-xs font-bold">
                                                {stat.change}
                                            </span>
                                        </div>
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

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Weekly Activity */}
                    <Card className="lg:col-span-2 backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-linear-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                                    <BarChart3
                                        className="text-white"
                                        size={20}
                                    />
                                </div>
                                Weekly Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="flex items-end justify-between gap-3 h-64">
                                    {weeklyData.map((data, index) => {
                                        const totalHeight =
                                            ((data.completed + data.pending) /
                                                maxValue) *
                                            100;
                                        const completedHeight =
                                            (data.completed /
                                                (data.completed +
                                                    data.pending)) *
                                            100;
                                        return (
                                            <div
                                                key={index}
                                                className="flex-1 flex flex-col items-center gap-2"
                                            >
                                                <div
                                                    className="w-full flex flex-col-reverse gap-1"
                                                    style={{ height: "100%" }}
                                                >
                                                    <div
                                                        className="w-full bg-linear-to-t from-indigo-500 to-indigo-600 rounded-t-xl relative group cursor-pointer transition-all hover:from-indigo-600 hover:to-indigo-700"
                                                        style={{
                                                            height: `${totalHeight}%`,
                                                        }}
                                                    >
                                                        <div
                                                            className="absolute bottom-0 w-full bg-linear-to-t from-emerald-500 to-emerald-600 rounded-t-xl"
                                                            style={{
                                                                height: `${completedHeight}%`,
                                                            }}
                                                        ></div>
                                                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            ✓ {data.completed} |
                                                            ⏰ {data.pending}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-600">
                                                    {data.day}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center justify-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        <span className="text-sm text-gray-600">
                                            Completed
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                        <span className="text-sm text-gray-600">
                                            Pending
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category Distribution */}
                    <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-linear-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <PieChart
                                        className="text-white"
                                        size={20}
                                    />
                                </div>
                                Categories
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {/* Pie Chart Visual */}
                                <div className="relative w-48 h-48 mx-auto">
                                    <svg
                                        viewBox="0 0 100 100"
                                        className="transform -rotate-90"
                                    >
                                        {categoryStats.reduce(
                                            (acc, cat, idx) => {
                                                const prevPercentage =
                                                    categoryStats
                                                        .slice(0, idx)
                                                        .reduce(
                                                            (sum, c) =>
                                                                sum +
                                                                c.percentage,
                                                            0
                                                        );
                                                const colors = [
                                                    "#6366f1",
                                                    "#10b981",
                                                    "#f59e0b",
                                                    "#a855f7",
                                                ];
                                                acc.push(
                                                    <circle
                                                        key={idx}
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="transparent"
                                                        stroke={colors[idx]}
                                                        strokeWidth="20"
                                                        strokeDasharray={`${
                                                            cat.percentage *
                                                            2.51
                                                        } ${
                                                            251 -
                                                            cat.percentage *
                                                                2.51
                                                        }`}
                                                        strokeDashoffset={
                                                            -prevPercentage *
                                                            2.51
                                                        }
                                                        className="transition-all duration-500"
                                                    />
                                                );
                                                return acc;
                                            },
                                            []
                                        )}
                                    </svg>
                                </div>

                                {/* Legend */}
                                <div className="space-y-3">
                                    {categoryStats.map((cat, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-4 h-4 rounded ${cat.color}`}
                                                ></div>
                                                <span className="font-semibold text-gray-800">
                                                    {cat.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-600">
                                                    {cat.value}
                                                </span>
                                                <span className="text-xs font-bold text-gray-500">
                                                    {cat.percentage}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Productivity Timeline & Achievements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Productivity Timeline */}
                    <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-linear-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                    <Activity
                                        className="text-white"
                                        size={20}
                                    />
                                </div>
                                Peak Productivity Hours
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                {productivityData.map((data, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4"
                                    >
                                        <span className="text-sm font-semibold text-gray-600 w-20">
                                            {data.time}
                                        </span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                                            <div
                                                className={`${data.color} h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500`}
                                                style={{
                                                    width: `${
                                                        (data.tasks / 18) * 100
                                                    }%`,
                                                }}
                                            >
                                                <span className="text-white text-xs font-bold">
                                                    {data.tasks}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievements */}
                    <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-linear-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                    <Award className="text-white" size={20} />
                                </div>
                                Achievements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {achievements.map((achievement, index) => {
                                    const Icon = achievement.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="p-4 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
                                        >
                                            <div
                                                className={`w-12 h-12 rounded-xl bg-linear-to-br ${achievement.color} flex items-center justify-center shadow-lg mb-3`}
                                            >
                                                <Icon
                                                    className="text-white"
                                                    size={20}
                                                />
                                            </div>
                                            <h4 className="font-bold text-gray-800 mb-1">
                                                {achievement.title}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {achievement.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
