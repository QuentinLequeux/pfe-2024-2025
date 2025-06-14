<?php

use Inertia\Inertia;
use App\Models\Animal;
use Illuminate\Http\Request;
use App\Http\Controllers\DonationController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/donation', function (Request $request) {
        $animal = Animal::findOrfail($request->get('animal'));

        if ($animal->adoption_status === 'Adopté') {
            abort(403, 'Cet animal a déjà été adopté.');
        }

        return Inertia::render('donation/checkout', ['stripeKey' => config('services.stripe.key')]);
    })->name('donation');

    Route::post('/donation', [DonationController::class, 'process'])->name('donation.process');

    Route::get('/success', [DonationController::class, 'success'])->name('donation.success');
});
