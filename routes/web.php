<?php

use Inertia\Inertia;
use App\Models\Animal;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimalController;
use Illuminate\Pagination\LengthAwarePaginator;

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

    Route::get('/animals/create', [AnimalController::class, 'create'])
        ->name('animals.create');

    Route::get('/animals/{animal:slug}', function (Animal $animal) {
        //$animal = Animal::with('organization', 'breed')->findOrFail($animal->id);
        $animal->photo_url = Storage::disk('s3')->url($animal->photo);
        $animals = Animal::with('breed')->withCount('sponsors')->where('id', '!=', $animal->id)->inRandomOrder()->limit(4)->get();
        foreach ($animals as $a) {
            $a->photo_url = Storage::disk('s3')->url($a->photo);
        }
        return Inertia::render('animals/show', ['animal' => $animal->load('organization', 'breed'), 'userRole' => auth()->user()->getRoleNames(), 'user' => auth()->user(), 'animals' => ['data' => $animals, 'links' => []]]);
    })->name('animals.show');

    Route::get('/sponsorship', function () {
        $user = auth()->user();

        $sponsored = $user->sponsoredAnimals()->with('breed')->withCount('sponsors')->get();

        $unique = $sponsored->unique('id')->values();

        $perPage = 10;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentItems = $unique->slice(($currentPage - 1) * $perPage, $perPage);

        foreach ($currentItems as $animal) {
            $animal->photo_url = Storage::disk('s3')->url($animal->photo);
        }

        $paginated = new LengthAwarePaginator(
            $currentItems,
            $unique->count(),
            $perPage,
            $currentPage,
            [
                'path' => request()->url(),
                'query' => request()->query(),
            ]
        );

        return Inertia::render('sponsorship/sponsorship', [
            'animals' => $paginated,
        ]);
    })->name('sponsorship');
});

require __DIR__ . '/api.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/animals.php';
require __DIR__ . '/donation.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/organization.php';
