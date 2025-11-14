<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $todos = Todo::where('user_id', auth()->id())
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('todos/index', [
            'title' => 'Daftar Todos',
            'todos' => $todos,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('todos/create', [
            'title' => 'Tambah Todo',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover' => 'nullable|image|max:2048',
            'status' => 'nullable|in:pending,in_progress,complete',
            'priority' => 'nullable|in:low,medium,high',
        ]);

        // Simpan cover jika ada
        if ($request->hasFile('cover')) {
            $validated['cover'] = $request->file('cover')->store('covers', 'public');
        }

        // Jika tidak ada field status dikirim, set default 'pending'
if (!$request->has('status') || empty($validated['status'])) {
    $validated['status'] = 'pending';
}

$validated['user_id'] = auth()->id();


        Todo::create($validated);

        return redirect()->route('todos.index')->with('success', 'Todo berhasil ditambahkan!');
    }

    public function show(Todo $todo)
    {
        // Batasi akses ke todo milik user sendiri
        $this->authorizeAccess($todo);

        return Inertia::render('todos/show', [
            'title' => 'Detail Todo',
            'todo' => $todo,
        ]);
    }

    public function edit(Todo $todo)
    {
        $this->authorizeAccess($todo);

        return Inertia::render('todos/edit', [
            'title' => 'Edit Todo',
            'todo' => $todo,
        ]);
    }

    public function update(Request $request, Todo $todo)
{
    $this->authorizeAccess($todo);

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'required|in:pending,in_progress,complete',
        'priority' => 'nullable|in:low,medium,high',
        'cover' => 'nullable|image|max:2048',
    ]);

    if ($request->hasFile('cover')) {
        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }
        $validated['cover'] = $request->file('cover')->store('covers', 'public');
    }

    $todo->update($validated);

    return redirect()->route('todos.index')->with('success', 'Todo berhasil diperbarui!');
}


    public function destroy(Todo $todo)
    {
        $this->authorizeAccess($todo);

        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $todo->delete();

        return redirect()->back()->with('success', 'Todo berhasil dihapus!');
    }

    /**
     * Batasi agar user hanya bisa mengakses todo miliknya sendiri
     */
    private function authorizeAccess(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {
            abort(403, 'Akses ditolak.');
        }
    }
}
