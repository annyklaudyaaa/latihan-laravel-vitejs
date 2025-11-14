import React from "react";
import { useForm, usePage } from "@inertiajs/react";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2Icon, Mail, Lock, CheckSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const { success } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/auth/login/post");
    };

    return (
        <AuthLayout>
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
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
                            Kelola tugas Anda dengan mudah
                        </p>
                    </div>

                    <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl rounded-2xl overflow-hidden">
                        <CardHeader className="text-center space-y-2 bg-linear-to-br from-indigo-50 to-blue-50 pb-6">
                            <CardTitle className="text-2xl font-bold text-gray-800">
                                Selamat Datang Kembali
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Masuk untuk melanjutkan ke dashboard Anda
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-6 pb-8 px-6">
                            {success && (
                                <div className="mb-6">
                                    <Alert className="border-emerald-200 bg-emerald-50 rounded-xl">
                                        <CheckCircle2Icon className="text-emerald-600" />
                                        <AlertTitle className="text-emerald-800">
                                            Berhasil!
                                        </AlertTitle>
                                        <AlertDescription className="text-emerald-700">
                                            {success}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <FieldGroup>
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
                                                placeholder="Masukkan kata sandi Anda"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-11 bg-white border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-xl h-12 transition-all"
                                            />
                                        </div>
                                        {errors.password && (
                                            <div className="text-sm text-red-600 mt-1.5">
                                                {errors.password}
                                            </div>
                                        )}
                                    </Field>

                                    <div className="flex items-center justify-between pt-1">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData(
                                                        "remember",
                                                        e.target.checked
                                                    )
                                                }
                                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-600">
                                                Ingat saya
                                            </span>
                                        </label>
                                        <a
                                            href="#"
                                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                                        >
                                            Lupa kata sandi?
                                        </a>
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 h-12"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Memproses..."
                                                : "Masuk"}
                                        </Button>
                                    </div>
                                </FieldGroup>
                            </form>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <FieldDescription className="text-center text-gray-600">
                                    Belum punya akun?{" "}
                                    <a
                                        href="/auth/register"
                                        className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                                    >
                                        Daftar sekarang
                                    </a>
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
