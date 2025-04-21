<?php

use App\Enums\AnimalStatus;
use App\Enums\Gender;
use App\Http\Controllers\AnimalRegistrationController;
use App\Models\Animals;
use App\Models\Breeds;
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
        return Inertia::render('animals', ['animals' => Animals::with('breed')->orderBy('id', 'desc')->paginate(10)]);
    })->name('animals');

    Route::get('/animals/create', function () {
        $user = auth()->user();
        return Inertia::render('create', [
            'organization' => $user->organization,
            'statuses' => AnimalStatus::cases(),
            'breeds' => Breeds::all(),
            'gender' => Gender::cases()
        ]);
    })->name('animals.create');

    Route::post('/animals/create', [AnimalRegistrationController::class, 'store'])
    ->name('animals.store');

    Route::get('/animals/{id}', function ($id) {
        $animal = Animals::with('organization', 'breed')->findOrFail($id);
        $animals = Animals::where('id', '!=', $id)->inRandomOrder()->limit(4)->get();
        return Inertia::render('show', ['animal' => $animal, 'animals' => ['data' => $animals, 'links' => []]]);
    })->name('animals.show');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
