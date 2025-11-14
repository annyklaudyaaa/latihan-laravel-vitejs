import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Link, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    Image as ImageIcon,
    FileText,
    Edit3,
    Trash2,
    Share2,
} from "lucide-react";

export default function Show({ todo, title }) {
    const { delete: destroy } = useForm();
    const handleDelete = () => {
        if (confirm("Yakin ingin menghapus todo ini?")) {
            destroy(route("todos.destroy", todo.id)); // pastikan route('todos.destroy') sudah ada di web.php
        }
    };
    const getStatusConfig = (status) => {
        const configs = {
            complete: {
                label: "Completed",
                icon: CheckCircle2,
                color: "from-emerald-500 to-emerald-600",
                bgColor: "from-emerald-50 to-green-50",
                textColor: "text-emerald-600",
                borderColor: "border-emerald-200",
            },
            pending: {
                label: "Pending",
                icon: Clock,
                color: "from-amber-500 to-amber-600",
                bgColor: "from-amber-50 to-yellow-50",
                textColor: "text-amber-600",
                borderColor: "border-amber-200",
            },
            in_progress: {
                // ← sesuai DB
                label: "In Progress",
                icon: Clock,
                color: "from-indigo-500 to-indigo-600",
                bgColor: "from-indigo-50 to-blue-50",
                textColor: "text-indigo-600",
                borderColor: "border-indigo-200",
            },
        };
        return configs[status] || configs.pending;
    };

    const statusConfig = getStatusConfig(todo.status);
    const StatusIcon = statusConfig.icon;

    const createdDate = new Date(
        todo.created_at || Date.now()
    ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between">
                    <Link href="/todos">
                        <Button className="bg-white/80 hover:bg-white text-gray-700 border border-gray-200 rounded-xl shadow-sm gap-2">
                            <ArrowLeft size={18} />
                            <span>Back to Todos</span>
                        </Button>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link href={`/todos/${todo.id}/edit`}>
                            <Button className="bg-white/80 hover:bg-white text-indigo-600 border border-indigo-200 rounded-xl shadow-sm gap-2">
                                <Edit3 size={18} />
                                <span className="hidden sm:inline">Edit</span>
                            </Button>
                        </Link>

                        <Button
                            onClick={handleDelete}
                            className="bg-white/80 hover:bg-white text-red-600 border border-red-200 rounded-xl shadow-sm gap-2"
                        >
                            <Trash2 size={18} />
                            <span className="hidden sm:inline">Delete</span>
                        </Button>

                        <Button className="bg-white/80 hover:bg-white text-gray-700 border border-gray-200 rounded-xl shadow-sm">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>

                {/* Main Todo Card */}
                <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-3xl overflow-hidden">
                    {/* Cover Image */}
                    {todo.cover && (
                        <div className="relative h-64 md:h-80 overflow-hidden bg-linear-to-br from-indigo-100 to-purple-100">
                            <img
                                src={`/storage/${todo.cover}`}
                                alt="Cover Todo"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

                            {/* Status Badge on Cover */}
                            <div className="absolute top-6 right-6">
                                <div
                                    className={`px-4 py-2 rounded-xl bg-linear-to-r ${statusConfig.color} backdrop-blur-xl flex items-center gap-2 shadow-lg`}
                                >
                                    <StatusIcon
                                        className="text-white"
                                        size={18}
                                    />
                                    <span className="text-white font-semibold text-sm">
                                        {statusConfig.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <CardContent className="p-6 md:p-8">
                        {/* Status Badge (if no cover) */}
                        {!todo.cover && (
                            <div className="mb-6">
                                <div
                                    className={`inline-flex px-4 py-2 rounded-xl bg-linear-to-r ${statusConfig.bgColor} border ${statusConfig.borderColor} items-center gap-2`}
                                >
                                    <StatusIcon
                                        className={statusConfig.textColor}
                                        size={18}
                                    />
                                    <span
                                        className={`${statusConfig.textColor} font-semibold text-sm`}
                                    >
                                        {statusConfig.label}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                            {todo.title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar size={18} />
                                <span className="text-sm">{createdDate}</span>
                            </div>
                            {todo.category && (
                                <div className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100">
                                    <span className="text-sm font-medium text-indigo-600">
                                        {todo.category}
                                    </span>
                                </div>
                            )}
                            {todo.priority && (
                                <div
                                    className={`px-3 py-1 rounded-lg ${
                                        todo.priority === "high"
                                            ? "bg-red-50 border-red-100 text-red-600"
                                            : todo.priority === "medium"
                                            ? "bg-amber-50 border-amber-100 text-amber-600"
                                            : "bg-gray-50 border-gray-100 text-gray-600"
                                    } border`}
                                >
                                    <span className="text-sm font-medium capitalize">
                                        {todo.priority}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                                    <FileText
                                        className="text-white"
                                        size={20}
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    Description
                                </h2>
                            </div>

                            {todo.description ? (
                                <div className="p-6 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {todo.description}
                                    </p>
                                </div>
                            ) : (
                                <div className="p-6 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 text-center">
                                    <p className="text-gray-400 italic">
                                        No description provided
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            <Card className="backdrop-blur-xl bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-100 shadow-sm rounded-2xl">
                                <CardContent className="p-5">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-2">
                                        Created
                                    </h3>
                                    <p className="text-lg font-bold text-gray-800">
                                        {createdDate}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="backdrop-blur-xl bg-linear-to-br from-purple-50 to-pink-50 border border-purple-100 shadow-sm rounded-2xl">
                                <CardContent className="p-5">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-2">
                                        Status
                                    </h3>
                                    <p className="text-lg font-bold text-gray-800 capitalize">
                                        {statusConfig.label}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
                            <Link href="/todos" className="flex-1">
                                <Button className="w-full bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl shadow-lg h-12 gap-2">
                                    <ArrowLeft size={18} />
                                    Back to List
                                </Button>
                            </Link>
                            <Link
                                href={`/todos/${todo.id}/edit`}
                                className="flex-1"
                            >
                                <Button className="w-full bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg h-12 gap-2">
                                    <Edit3 size={18} />
                                    Edit Todo
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Timeline (Optional) */}
                <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-linear-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                        <CardTitle className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                                <Clock className="text-white" size={20} />
                            </div>
                            Activity Timeline
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                        <CheckCircle2
                                            className="text-white"
                                            size={18}
                                        />
                                    </div>
                                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                                </div>
                                <div className="flex-1 pb-6">
                                    <p className="font-semibold text-gray-800">
                                        Task Created
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {createdDate}
                                    </p>
                                </div>
                            </div>

                            {todo.status === "done" && (
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                            <CheckCircle2
                                                className="text-white"
                                                size={18}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">
                                            Task Completed
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Recently
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
