<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\ProfileController;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ---------------------------
// Routes yang butuh auth
// ---------------------------
Route::middleware(['auth'])->group(function () {

    /// Profile hanya tampil, tanpa edit
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');

});

// ---------------------------
// Routes handle inertia
// ---------------------------
Route::middleware(['handle.inertia'])->group(function () {

    // Auth Routes
    Route::prefix('auth')->group(function () {
        Route::get('/login', [AuthController::class, 'login'])->name('auth.login');
        Route::post('/login/post', [AuthController::class, 'postLogin'])->name('auth.login.post');

        Route::get('/register', [AuthController::class, 'register'])->name('auth.register');
        Route::post('/register/post', [AuthController::class, 'postRegister'])->name('auth.register.post');

        Route::get('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    });

    // Semua route yang butuh login
    Route::middleware('check.auth')->group(function () {

        // Homepage
        Route::get('/', [HomeController::class, 'home'])->name('home');

        // Todos CRUD
        Route::get('/todos', [TodoController::class, 'index'])->name('todos.index');
        Route::get('/todos/create', [TodoController::class, 'create'])->name('todos.create');
        Route::post('/todos', [TodoController::class, 'store'])->name('todos.store');
        Route::get('/todos/{todo}', [TodoController::class, 'show'])->name('todos.show');
        Route::get('/todos/{todo}/edit', [TodoController::class, 'edit'])->name('todos.edit');
        Route::put('/todos/{todo}', [TodoController::class, 'update'])->name('todos.update');
        Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])->name('todos.destroy');

        // Stats
        Route::get('/stats', function () {
            $todos = Auth::check() ? Todo::where('user_id', Auth::id())->get() : collect();

            return Inertia::render('stats', [
                'title' => 'Statistik Aktivitas',
                'todos' => $todos,
            ]);
        })->name('stats');
    });
});
