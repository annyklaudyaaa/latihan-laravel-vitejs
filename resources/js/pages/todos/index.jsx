import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { usePage, Link, router } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import {
    Plus,
    Search,
    Eye,
    Edit3,
    Trash2,
    CheckCircle2,
    Clock,
    FileText,
    Image as ImageIcon,
    Filter,
    LayoutGrid,
    List,
} from "lucide-react";

export default function TodosIndex() {
    const { title, todos, flash, filters } = usePage().props;
    const [search, setSearch] = React.useState(filters?.search || "");
    const [viewMode, setViewMode] = React.useState("grid"); // "grid" or "list"

    // Alert sukses/gagal
    React.useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: flash.success,
                timer: 2000,
                showConfirmButton: false,
                background: "#fff",
                iconColor: "#10b981",
            });
        }
        if (flash?.error) {
            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: flash.error,
                background: "#fff",
                iconColor: "#ef4444",
            });
        }
    }, [flash]);

    // Cari todo
    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/todos", { search });
    };

    // Hapus todo
    const handleDelete = (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data ini akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            background: "#fff",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/todos/${id}`);
            }
        });
    };

    const getStatusConfig = (status) => {
        const configs = {
            complete: {
                label: "Completed",
                color: "text-emerald-600",
                bgColor: "bg-emerald-50",
                icon: CheckCircle2,
            },
            pending: {
                label: "Pending",
                color: "text-amber-600",
                bgColor: "bg-amber-50",
                icon: Clock,
            },
            in_progress: {
                label: "In Progress",
                color: "text-indigo-600",
                bgColor: "bg-indigo-50",
                icon: Clock,
            },
        };
        return configs[status] || configs.pending;
    };

    // 🔧 Tambahkan setelah getStatusConfig()
    const getPriorityConfig = (priority) => {
        const configs = {
            high: {
                label: "High",
                color: "text-red-600",
                bgColor: "bg-red-50",
            },
            medium: {
                label: "Medium",
                color: "text-amber-600",
                bgColor: "bg-amber-50",
            },
            low: {
                label: "Low",
                color: "text-emerald-600",
                bgColor: "bg-emerald-50",
            },
        };
        return configs[priority] || configs.medium;
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent mb-2">
                            📝 My Todos
                        </h1>
                        <p className="text-gray-600">
                            Manage and organize your tasks
                        </p>
                    </div>

                    <Link href="/todos/create">
                        <Button className="bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg h-12 gap-2">
                            <Plus size={20} />
                            <span>New Todo</span>
                        </Button>
                    </Link>
                </div>

                {/* Search & Filter Bar */}
                <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-4">
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <div className="relative flex-1">
                                <Search
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <Input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search todos..."
                                    className="pl-12 h-12 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-300"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl h-12 px-6 gap-2"
                                >
                                    <Search size={18} />
                                    <span className="hidden sm:inline">
                                        Search
                                    </span>
                                </Button>
                                <Button
                                    type="button"
                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl h-12 px-4"
                                    onClick={() =>
                                        setViewMode(
                                            viewMode === "grid"
                                                ? "list"
                                                : "grid"
                                        )
                                    }
                                >
                                    {viewMode === "grid" ? (
                                        <List size={18} />
                                    ) : (
                                        <LayoutGrid size={18} />
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="backdrop-blur-xl bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-100 shadow-sm rounded-2xl">
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-600 mb-1">Total</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {todos?.total || 0}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="backdrop-blur-xl bg-linear-to-br from-emerald-50 to-green-50 border border-emerald-100 shadow-sm rounded-2xl">
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-600 mb-1">
                                Completed
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                                {todos?.data?.filter(
                                    (t) => t.status === "complete"
                                ).length || 0}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="backdrop-blur-xl bg-linear-to-br from-amber-50 to-yellow-50 border border-amber-100 shadow-sm rounded-2xl">
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-600 mb-1">
                                Pending
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                                {todos?.data?.filter(
                                    (t) => t.status === "pending"
                                ).length || 0}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="backdrop-blur-xl bg-linear-to-br from-purple-50 to-pink-50 border border-purple-100 shadow-sm rounded-2xl">
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-600 mb-1">
                                In Progress
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                                {todos?.data?.filter(
                                    (t) => t.status === "in_progress"
                                ).length || 0}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Todos List/Grid */}
                {todos?.data?.length > 0 ? (
                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "space-y-4"
                        }
                    >
                        {todos.data.map((todo) => {
                            const statusConfig = getStatusConfig(todo.status);
                            const StatusIcon = statusConfig.icon;
                            const priorityConfig = getPriorityConfig(
                                todo.priority
                            ); // 🔧 Tambah ini

                            return viewMode === "grid" ? (
                                // Grid View
                                <Card
                                    key={todo.id}
                                    className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    {todo.cover && (
                                        <div className="relative h-48 overflow-hidden bg-gray-100">
                                            <img
                                                src={`/storage/${todo.cover}`}
                                                alt={todo.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                                        </div>
                                    )}

                                    <CardContent className="p-5">
                                        {/* Status Badge */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex gap-2">
                                                {/* 🔧 Status */}
                                                <div
                                                    className={`flex items-center gap-2 px-3 py-1 rounded-lg ${statusConfig.bgColor}`}
                                                >
                                                    <StatusIcon
                                                        className={
                                                            statusConfig.color
                                                        }
                                                        size={14}
                                                    />
                                                    <span
                                                        className={`text-xs font-semibold ${statusConfig.color}`}
                                                    >
                                                        {statusConfig.label}
                                                    </span>
                                                </div>

                                                {/* 🔧 Priority */}
                                                <div
                                                    className={`px-3 py-1 rounded-lg ${priorityConfig.bgColor}`}
                                                >
                                                    <span
                                                        className={`text-xs font-semibold ${priorityConfig.color}`}
                                                    >
                                                        {priorityConfig.label}
                                                    </span>
                                                </div>
                                            </div>

                                            {!todo.cover && (
                                                <FileText
                                                    className="text-gray-300"
                                                    size={20}
                                                />
                                            )}
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                                            {todo.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                            {todo.description ||
                                                "No description"}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                                            <Link
                                                href={`/todos/${todo.id}`}
                                                className="flex-1"
                                            >
                                                <Button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl h-9 gap-2 text-sm">
                                                    <Eye size={16} />
                                                    View
                                                </Button>
                                            </Link>
                                            <Link
                                                href={`/todos/${todo.id}/edit`}
                                            >
                                                <Button className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl h-9 px-3">
                                                    <Edit3 size={16} />
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() =>
                                                    handleDelete(todo.id)
                                                }
                                                className="bg-red-50 hover:bg-red-100 text-red-600 rounded-xl h-9 px-3"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                // List View
                                <Card
                                    key={todo.id}
                                    className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                                >
                                    <CardContent className="p-5">
                                        <div className="flex gap-4">|</div>
                                        {/* Thumbnail */}

                                        {todo.cover ? (
                                            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                                                <img
                                                    src={`/storage/${todo.cover}`}
                                                    alt={todo.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 rounded-xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center shrink-0">
                                                <FileText
                                                    className="text-gray-400"
                                                    size={32}
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-bold text-gray-800 text-lg">
                                                    {todo.title}
                                                </h3>
                                                <div className="flex items-center gap-2 shrink-0 ml-2">
                                                    {/* 🔧 Status */}
                                                    <div
                                                        className={`flex items-center gap-2 px-3 py-1 rounded-lg ${statusConfig.bgColor}`}
                                                    >
                                                        <StatusIcon
                                                            className={
                                                                statusConfig.color
                                                            }
                                                            size={14}
                                                        />
                                                        <span
                                                            className={`text-xs font-semibold ${statusConfig.color}`}
                                                        >
                                                            {statusConfig.label}
                                                        </span>
                                                    </div>

                                                    {/* 🔧 Priority */}
                                                    <div
                                                        className={`px-3 py-1 rounded-lg ${priorityConfig.bgColor}`}
                                                    >
                                                        <span
                                                            className={`text-xs font-semibold ${priorityConfig.color}`}
                                                        >
                                                            {
                                                                priorityConfig.label
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                    {todo.description ||
                                                        "No description"}
                                                </p>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/todos/${todo.id}`}
                                                    >
                                                        <Button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl h-9 gap-2 text-sm px-4">
                                                            <Eye size={16} />
                                                            <span className="hidden sm:inline">
                                                                View
                                                            </span>
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={`/todos/${todo.id}/edit`}
                                                    >
                                                        <Button className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl h-9 gap-2 text-sm px-4">
                                                            <Edit3 size={16} />
                                                            <span className="hidden sm:inline">
                                                                Edit
                                                            </span>
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        onClick={() =>
                                                            handleDelete(
                                                                todo.id
                                                            )
                                                        }
                                                        className="bg-red-50 hover:bg-red-100 text-red-600 rounded-xl h-9 gap-2 text-sm px-4"
                                                    >
                                                        <Trash2 size={16} />
                                                        <span className="hidden sm:inline">
                                                            Delete
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-lg rounded-2xl">
                        <CardContent className="p-12 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
                                <FileText className="text-gray-400" size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                No Todos Yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Start by creating your first todo
                            </p>
                            <Link href="/todos/create">
                                <Button className="bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl h-12 gap-2 px-6">
                                    <Plus size={20} />
                                    Create Todo
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {todos?.links && todos.links.length > 3 && (
                    <div className="flex justify-center">
                        <div className="inline-flex gap-1 bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
                            {todos.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() =>
                                        link.url && router.visit(link.url)
                                    }
                                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                                        link.active
                                            ? "bg-linear-to-r from-indigo-500 to-indigo-600 text-white shadow-lg"
                                            : "text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
