<?php

use Inertia\Inertia;
use App\Http\Controllers\DonationController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/donation', function () {
        return Inertia::render('donation/checkout', ['stripeKey' => config('services.stripe.key')]);
    })->name('donation');

    Route::post('/donation', [DonationController::class, 'process'])->name('donation.process');

    Route::get('/success', [DonationController::class, 'success'])->name('donation.success');
});
