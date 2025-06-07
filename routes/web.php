<?php

use Inertia\Inertia;
use App\Enums\Gender;
use App\Models\Breeds;
use App\Models\Animals;
use App\Enums\AnimalStatus;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimalController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $sponsoredAnimals = $user->sponsoredAnimals()->count();
        return Inertia::render('dashboard', [
            'user' => $user,
            'sponsoredAnimals' => $sponsoredAnimals,
        ]);
    })->name('dashboard');

    Route::get('/animals', function () {
        return Inertia::render('animals/animals', ['success' => session('success'), 'animals' => Animals::with('breed')->orderBy('id', 'desc')->paginate(10)]);
    })->name('animals');

    Route::get('/animals/create', function () {
        $user = auth()->user();
        return Inertia::render('animals/create', [
            'organization' => $user->organization,
            'statuses' => AnimalStatus::cases(),
            'breeds' => Breeds::all(),
            'gender' => Gender::cases()
        ]);
    })->name('animals.create');

    Route::post('/animals', [AnimalController::class, 'store'])
        ->name('animals.store');

    Route::delete('/animals/{animal}', [AnimalController::class, 'destroy'])
        ->name('animals.destroy');

    Route::get('/animals/{animal}/edit', function (Animals $animal) {
        $user = auth()->user();
        return Inertia::render('animals/edit', [
            'animal' => $animal,
            'organization' => $user->organization,
            'statuses' => AnimalStatus::cases(),
            'breeds' => Breeds::all(),
            'gender' => Gender::cases()
        ]);
    })->name('animals.edit');

    Route::post('/animals/{animal}', [AnimalController::class, 'update'])
        ->name('animals.update');

    Route::get('/animals/{id}', function ($id) {
        $animal = Animals::with('organization', 'breed')->findOrFail($id);
        $animals = Animals::where('id', '!=', $id)->inRandomOrder()->limit(4)->get();
        return Inertia::render('animals/show', ['animal' => $animal, 'animals' => ['data' => $animals, 'links' => []]]);
    })->name('animals.show');

    Route::get('/sponsorship', function () {
        $user = auth()->user();
        $animals = $user->sponsoredAnimals()->with('breed')->paginate(10);
        return Inertia::render('sponsorship/sponsorship', [
            'animals' => $animals
        ]);
    })->name('sponsorship');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
require __DIR__ . '/donation.php';
require __DIR__ . '/animals.php';
require __DIR__ . '/organization.php';
