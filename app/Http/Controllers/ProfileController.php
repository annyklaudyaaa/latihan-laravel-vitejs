<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Tampilkan halaman profil user
     */
    public function show()
    {
        $user = Auth::user();

        return Inertia::render('profile', [
            'title' => 'Profil Pengguna',
            'auth' => [
                'user' => $user
            ],
        ]);
    }
}
