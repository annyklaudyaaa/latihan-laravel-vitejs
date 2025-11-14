import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { User, Mail, Lock, CheckSquare } from "lucide-react";

export default function RegisterPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/auth/register/post", {
            onSuccess: () => {
                reset("name", "email", "password");
            },
            onError: () => {
                reset("password");
            },
        });
    };

    return (
        <AuthLayout>
            <div className="min-h-screen flex items-center justify-center bg-linear-to-brrom-slate-50 via-blue-50 to-indigo-100 p-4">
                <div className="w-full max-w-md">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-600 to-indigo-800 shadow-lg mb-4">
                            <CheckSquare className="text-white" size={32} />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            DelTodos
                        </h1>
                        <p className="text-gray-600">
                            Mulai kelola tugas Anda hari ini
                        </p>
                    </div>

                    <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl rounded-2xl overflow-hidden">
                        <CardHeader className="text-center space-y-2 bg-linear-to-br from-indigo-50 to-blue-50 pb-6">
                            <CardTitle className="text-2xl font-bold text-gray-800">
                                Buat Akun Baru
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Daftar untuk memulai perjalanan produktivitas
                                Anda
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-6 pb-8 px-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel
                                            htmlFor="name"
                                            className="text-gray-700 font-medium"
                                        >
                                            Nama Lengkap
                                        </FieldLabel>
                                        <div className="relative">
                                            <User
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={20}
                                            />
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Masukkan nama lengkap Anda"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-11 bg-white border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-xl h-12 transition-all"
                                                required
                                            />
                                        </div>
                                        {errors.name && (
                                            <div className="text-sm text-red-600 mt-1.5">
                                                {errors.name}
                                            </div>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel
                                            htmlFor="email"
                                            className="text-gray-700 font-medium"
                                        >
                                            Email
                                        </FieldLabel>
                                        <div className="relative">
                                            <Mail
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={20}
                                            />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="nama@email.com"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-11 bg-white border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-xl h-12 transition-all"
                                                required
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="text-sm text-red-600 mt-1.5">
                                                {errors.email}
                                            </div>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel
                                            htmlFor="password"
                                            className="text-gray-700 font-medium"
                                        >
                                            Kata Sandi
                                        </FieldLabel>
                                        <div className="relative">
                                            <Lock
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={20}
                                            />
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Minimal 8 karakter"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-11 bg-white border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-xl h-12 transition-all"
                                                required
                                            />
                                        </div>
                                        {errors.password && (
                                            <div className="text-sm text-red-600 mt-1.5">
                                                {errors.password}
                                            </div>
                                        )}
                                    </Field>

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 h-12"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Memproses..."
                                                : "Daftar Sekarang"}
                                        </Button>
                                    </div>
                                </FieldGroup>
                            </form>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <FieldDescription className="text-center text-gray-600">
                                    Sudah punya akun?{" "}
                                    <Link
                                        href="/auth/login"
                                        className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                                    >
                                        Masuk di sini
                                    </Link>
                                </FieldDescription>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="text-center mt-8 text-sm text-gray-500">
                        <p>© 2024 DelTodos. Semua hak dilindungi.</p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
