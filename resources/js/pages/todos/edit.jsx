import React, { useState } from "react";
import { useForm, router, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import {
    ArrowLeft,
    Save,
    FileText,
    Image as ImageIcon,
    Upload,
    X,
    Edit3,
} from "lucide-react";

export default function Edit({ todo }) {
    const [previewImage, setPreviewImage] = useState(
        todo.cover ? `/storage/${todo.cover}` : null
    );

    const { data, setData, processing, errors } = useForm({
        title: todo.title || "",
        description: todo.description || "",
        cover: null, // wajib null awalnya
        status: todo.status || "pending",
        priority: todo.priority || "high",
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("cover", file); // harus File object
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData("cover", null);
        setPreviewImage(todo.cover ? `/storage/${todo.cover}` : null);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PUT"); // penting untuk Laravel
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("status", data.status);
        formData.append("priority", data.priority);
        if (data.cover instanceof File) formData.append("cover", data.cover);

        router.post(`/todos/${todo.id}`, formData, {
            forceFormData: true, // wajib untuk file upload
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Todo berhasil diperbarui",
                    timer: 2000,
                    showConfirmButton: false,
                });
                router.get("/todos"); // redirect ke daftar
            },
            onError: (err) => {
                console.log(err); // lihat error Laravel
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Pastikan semua data valid",
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
                        <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent mb-2">
                            Edit Todo
                        </h1>
                        <p className="text-gray-600">
                            Update your task information
                        </p>
                    </div>
                    <Link href="/todos">
                        <Button className="bg-white/80 hover:bg-white text-gray-700 border border-gray-200 rounded-xl shadow-sm gap-2">
                            <ArrowLeft size={18} />{" "}
                            <span className="hidden sm:inline">Back</span>
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-3xl overflow-hidden">
                    <CardHeader className="bg-linear-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                        <CardTitle className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <Edit3 className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    Todo Information
                                </h2>
                                <p className="text-sm text-gray-600 font-normal">
                                    Fill in the details below
                                </p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FileText
                                        size={18}
                                        className="text-indigo-600"
                                    />{" "}
                                    Title
                                </label>
                                <Input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="h-12 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 text-base"
                                    placeholder="Enter todo title"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FileText
                                        size={18}
                                        className="text-indigo-600"
                                    />{" "}
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="w-full min-h-[150px] px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none resize-y text-base"
                                    placeholder="Enter detailed description..."
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Cover */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <ImageIcon
                                        size={18}
                                        className="text-indigo-600"
                                    />{" "}
                                    Cover Image
                                </label>
                                {previewImage && (
                                    <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-50">
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
                                            <p className="text-white text-sm font-medium">
                                                {data.cover
                                                    ? "New image selected"
                                                    : "Current cover image"}
                                            </p>
                                        </div>
                                    </div>
                                )}

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
                                    <p className="text-sm text-red-600">
                                        {errors.cover}
                                    </p>
                                )}
                            </div>

                            {/* Priority & Status */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <select
                                    value={data.priority}
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                    className="w-full border rounded-xl p-3"
                                >
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full border rounded-xl p-3"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="complete">Completed</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                                <Link href="/todos" className="flex-1">
                                    <Button
                                        type="button"
                                        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg h-12 gap-2"
                                    >
                                        <X size={18} /> Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg h-12 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save size={18} />{" "}
                                    {processing ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
