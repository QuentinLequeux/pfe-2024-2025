<?php

use App\Http\Controllers\DonationController;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/donation', function () {
        return Inertia::render('donation/checkout', ['stripeKey' => config('services.stripe.key')]);
    })->name('donation');

    Route::post('/donation', [DonationController::class, 'process'])->name('donation.process');

    Route::get('/success', function() {
        return Inertia::render('donation/success');
    })->name('success');
});
