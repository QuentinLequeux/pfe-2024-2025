<?php

use Inertia\Inertia;
use App\Models\Animal;
use App\Models\Transaction;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
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
        $animal->photo_url = $animal->photo
        ? Storage::disk('s3')->url($animal->photo)
            : null;
        $animals = Animal::with('breed')
            ->withCount('sponsors')
            ->where('id', '!=', $animal->id)
            ->orderByRaw("
            CASE adoption_status
                WHEN 'Disponible' THEN 1
                WHEN 'En attente' THEN 2
                WHEN 'Adopté' THEN 3
            END
            ")
            ->orderBy('sponsors_count', 'asc')
            ->orderByRaw('RAND()')
            ->limit(4)
            ->get();

        foreach ($animals as $a) {
            $a->photo_url = $a->photo
                ? Storage::disk('s3')->url($a->photo)
                : null;
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
            $animal->photo_url = $animal->photo
                ? Storage::disk('s3')->url($animal->photo)
                : null;
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

    Route::get('/history', function () {
        $perPage = 15;
        return Inertia::render('sponsorship/history', [
            'transactions' => QueryBuilder::for(Transaction::where('user_id', auth()->id()))
                ->allowedSorts(['created_at'])
                ->defaultSort('-created_at')
                ->paginate($perPage)
                ->withQueryString(),
            'total' => Transaction::where('user_id', auth()->id())->sum('amount'),
            'sort' => request('sort', '-created_at'),
        ]);
    })->name('history');
});

require __DIR__ . '/api.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/animals.php';
require __DIR__ . '/donation.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/organization.php';

// TODO : Renommer 'history' en 'transactions'.
