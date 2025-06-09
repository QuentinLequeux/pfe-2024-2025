<?php

use Inertia\Inertia;
use App\Models\Animals;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimalController;

Route::get('/', function () {
    return Inertia::render('welcome');
    {/*->through(function ($animal) {
                $animal->photo_url = Storage::disk('s3')->url($animal->photo);
                return $animal;
            })]);*/}
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $sponsoredAnimals = $user->sponsoredAnimals()->count();
        return Inertia::render('dashboard', [
            'user' => $user,
            'sponsoredAnimals' => $sponsoredAnimals,
        ]);
    })->name('dashboard');

    Route::get('/animals/create', [AnimalController::class, 'create'])
        ->name('animals.create');

    Route::get('/animals/{id}', function ($id) {
        $animal = Animals::with('organization', 'breed')->findOrFail($id);
        $animals = Animals::with('breed')->where('id', '!=', $id)->inRandomOrder()->limit(4)->get();
        return Inertia::render('animals/show', ['animal' => $animal, 'animals' => ['data' => $animals, 'links' => []]]);
        {/*->through(function ($animal) {
                $animal->photo_url = Storage::disk('s3')->url($animal->photo);
                return $animal;
            })]);*/}
    })->name('animals.show');

    Route::get('/sponsorship', function () {
        $user = auth()->user();
        $animals = $user->sponsoredAnimals()->with('breed')->paginate(10);
        return Inertia::render('sponsorship/sponsorship', [
            'animals' => $animals
        ]);
        {/*->through(function ($animal) {
                $animal->photo_url = Storage::disk('s3')->url($animal->photo);
                return $animal;
            })]);*/}
    })->name('sponsorship');
});

require __DIR__ . '/api.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/animals.php';
require __DIR__ . '/donation.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/organization.php';
