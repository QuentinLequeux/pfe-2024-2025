<?php

use App\Http\Controllers\DonationController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/donation', [DonationController::class, 'show'])->name('donation');

    Route::post('/donation', [DonationController::class, 'process'])->name('donation.process');

    Route::get('/success', [DonationController::class, 'success'])->name('donation.success');
});
