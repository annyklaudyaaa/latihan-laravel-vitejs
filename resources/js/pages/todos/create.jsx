import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { route } from "ziggy-js";
import {
    ArrowLeft,
    Plus,
    FileText,
    Image as ImageIcon,
    Upload,
    X,
    Sparkles,
    Tag,
    Flag,
} from "lucide-react";

export default function Create() {
    const [previewImage, setPreviewImage] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        status: "pending",
        category: "",
        priority: "medium",
        cover: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("cover", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData("cover", null);
        setPreviewImage(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("todos.store"), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Todo berhasil ditambahkan 🎉",
                    timer: 2000,
                    showConfirmButton: false,
                    background: "#fff",
                    iconColor: "#10b981",
                    confirmButtonColor: "#6366f1",
                });
                reset();
                setPreviewImage(null);
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Periksa kembali input kamu.",
                    background: "#fff",
                    iconColor: "#ef4444",
                    confirmButtonColor: "#6366f1",
                });
            },
        });
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                            <h1 className="relative text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent mb-2">
                                ✨ Create New Todo
                            </h1>
                        </div>

                        <p className="text-gray-600">
                            Add a new task to your list
                        </p>
                    </div>
                    <Link href={route("todos.index")}>
                        <Button className="bg-white/80 hover:bg-white text-gray-700 border border-gray-200 rounded-xl shadow-sm gap-2">
                            <ArrowLeft size={18} />
                            <span className="hidden sm:inline">Back</span>
                        </Button>
                    </Link>
                </div>

                {/* Form Card */}
                <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-3xl overflow-hidden">
                    <CardHeader className="bg-linear-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                        <CardTitle className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <Plus className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    New Todo Details
                                </h2>
                                <p className="text-sm text-gray-600 font-normal">
                                    Fill in the information below
                                </p>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FileText
                                        size={18}
                                        className="text-indigo-600"
                                    />
                                    Title{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="h-12 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 text-base"
                                    placeholder="Enter todo title..."
                                    required
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Description Textarea */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FileText
                                        size={18}
                                        className="text-indigo-600"
                                    />
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="w-full min-h-[150px] px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none resize-y text-base"
                                    placeholder="Enter detailed description... (optional)"
                                    rows="6"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Cover Image Upload */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <ImageIcon
                                        size={18}
                                        className="text-indigo-600"
                                    />
                                    Cover Image{" "}
                                    <span className="text-gray-400 text-xs font-normal">
                                        (optional)
                                    </span>
                                </label>

                                {/* Preview Image */}
                                {previewImage && (
                                    <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-200 bg-gray-50">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-full h-64 object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg transition-all"
                                        >
                                            <X
                                                className="text-white"
                                                size={20}
                                            />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                                            <p className="text-white text-sm font-medium flex items-center gap-2">
                                                <Sparkles size={16} />
                                                Image preview
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Upload Button */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="hidden"
                                        id="cover-upload"
                                    />
                                    <label
                                        htmlFor="cover-upload"
                                        className="flex items-center justify-center gap-3 w-full h-24 border-2 border-dashed border-indigo-200 rounded-2xl bg-linear-to-br from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 cursor-pointer transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <Upload
                                                className="text-white"
                                                size={24}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {previewImage
                                                    ? "Change Image"
                                                    : "Upload Cover Image"}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Click to browse files
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {errors.cover && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.cover}
                                    </p>
                                )}
                            </div>

                            {/* Status Select */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Tag
                                        size={18}
                                        className="text-indigo-600"
                                    />
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none text-base"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="complete">Complete</option>
                                </select>
                            </div>

                            {/* Priority Select */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Flag
                                        size={18}
                                        className="text-indigo-600"
                                    />
                                    Priority
                                </label>
                                <select
                                    value={data.priority}
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none text-base"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                                <Link
                                    href={route("todos.index")}
                                    className="flex-1"
                                >
                                    <Button
                                        type="button"
                                        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg h-12 gap-2"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg h-12 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus size={18} />
                                    {processing ? "Creating..." : "Create Todo"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Quick Tips Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="backdrop-blur-xl bg-linear-to-br from-emerald-50 to-green-50 border border-emerald-200 shadow-lg rounded-2xl">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0">
                                    <Sparkles
                                        className="text-white"
                                        size={20}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2">
                                        Pro Tips
                                    </h3>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        <li>
                                            • Use descriptive titles for clarity
                                        </li>
                                        <li>• Break down complex tasks</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="backdrop-blur-xl bg-linear-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-lg rounded-2xl">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                                    <ImageIcon
                                        className="text-white"
                                        size={20}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2">
                                        Cover Images
                                    </h3>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        <li>• Add visual context to tasks</li>
                                        <li>• Supports JPG, PNG formats</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
