<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Todo;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        $user = Auth::user();

        $todos = Todo::where('user_id', $user->id)->get();

        return Inertia::render('app/HomePage', [
            'title' => 'Beranda',
            'auth' => [
                'user' => $user,
            ],
            'todos' => $todos,
        ]);
    }
}
