<?php

use Inertia\Inertia;
use App\Http\Controllers\OrganizationController;

Route::middleware(['auth'])->group(function () {
    Route::get('/organizations', function () {
        return Inertia::render('organization/show', [
            'success' => session('success'),
        ]);
    })->name('organization.show');

    Route::get('/organization/admin', [OrganizationController::class, 'show'])
        ->name('organization.admin');

    Route::post('/organization/admin', [OrganizationController::class, 'updateUserOrganization'])
        ->name('organization.admin.update');
});
