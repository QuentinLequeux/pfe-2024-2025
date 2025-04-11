<?php

use App\Models\Animals;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/animals', function () {
        return Inertia::render('animals', ['animals' => Animals::orderBy('id', 'desc')->paginate(10)]);
    })->name('animals');
    Route::get('/animals/{id}', function ($id) {
        return Inertia::render('show', ['animal' => Animals::with('organization')->findOrFail($id)]);
    })->name('animals.show');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
