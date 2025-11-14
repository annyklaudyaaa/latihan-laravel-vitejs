import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { User, Mail, Lock, Calendar, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Profile() {
    const { auth, title } = usePage().props;
    const user = auth?.user;

    const joinDate = new Date(
        user?.created_at || Date.now()
    ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Foto bisa diganti manual
    const userPhoto = "/image/anny.jpg"; // ganti path sesuai kebutuhan

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                        {title}
                    </h1>
                </div>

                {/* Profile Card */}
                <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-3xl overflow-hidden">
                    <div className="h-32 bg-linear-to-r from-indigo-500 via-indigo-600 to-indigo-700 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                                <img
                                    src={userPhoto}
                                    alt="User Photo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <CardContent className="pt-20 pb-8 px-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                    {user?.name || "Guest User"}
                                </h2>
                                <p className="text-indigo-600 font-medium flex items-center gap-2">
                                    <Mail size={16} />
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="p-4 rounded-2xl bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                                        <Calendar
                                            className="text-white"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">
                                            Member Since
                                        </p>
                                        <p className="text-sm font-bold text-gray-800">
                                            {joinDate}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-linear-to-br from-emerald-50 to-green-50 border border-emerald-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                                        <Award
                                            className="text-white"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">
                                            Tasks Completed
                                        </p>
                                        <p className="text-sm font-bold text-gray-800">
                                            24 Tasks
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-linear-to-br from-purple-50 to-pink-50 border border-purple-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                                        <User
                                            className="text-white"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">
                                            Account Status
                                        </p>
                                        <p className="text-sm font-bold text-gray-800">
                                            Active
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Card */}
                        <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-xl rounded-3xl overflow-hidden">
                            <CardHeader className="bg-linear-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                                <CardTitle className="flex items-center gap-3 text-gray-800">
                                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                                        <Lock
                                            className="text-white"
                                            size={20}
                                        />
                                    </div>
                                    Security Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                Change Password
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Update your password regularly
                                            </p>
                                        </div>
                                        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">
                                            Change
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                Two-Factor Authentication
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Add an extra layer of security
                                            </p>
                                        </div>
                                        <Button className="bg-gray-500 hover:bg-gray-600 text-white rounded-xl">
                                            Enable
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                Active Sessions
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Manage your active sessions
                                            </p>
                                        </div>
                                        <Button className="bg-gray-500 hover:bg-gray-600 text-white rounded-xl">
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
