<?php

use Inertia\Inertia;
use App\Models\Organizations;
use App\Http\Controllers\OrganizationController;

Route::middleware(['auth'])->group(function () {
    Route::get('/organizations', function () {
        $organizations = Organizations::all();
        return Inertia::render('organization/show', [
            'success' => session('success'),
            'organizations' => $organizations,
        ]);
    })->name('organization.show');

    Route::get('/organization/create', [OrganizationController::class, 'create'])
        ->name('organization.create');

    Route::post('/organization/create', [OrganizationController::class, 'store'])
        ->name('organization.store');

    Route::get('/organization/admin', [OrganizationController::class, 'show'])
        ->name('organization.admin');

    Route::post('/organization/admin', [OrganizationController::class, 'updateUserOrganization'])
        ->name('organization.admin.update');
});
