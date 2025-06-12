<?php

use App\Http\Controllers\AnimalController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/animals', [AnimalController::class, 'show'])
        ->name('animals');

    Route::post('/animals', [AnimalController::class, 'store'])
        ->name('animals.store');

    Route::delete('/animals/{animal}', [AnimalController::class, 'destroy'])
        ->name('animals.destroy');

    Route::get('/animals/{animal}/edit', [AnimalController::class, 'edit'])
        ->name('animals.edit');

    Route::post('/animals/{animal}', [AnimalController::class, 'update'])
        ->name('animals.update');
});
