<?php

use Inertia\Inertia;
use App\Models\Organization;
use App\Http\Controllers\OrganizationController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/organizations', function () {
        $organizations = Organization::paginate(6)->withQueryString();
        return Inertia::render('organization/show', [
            'success' => session('success'),
            'organizations' => $organizations,
            'userRole' => auth()->user()->getRoleNames(),
        ]);
    })->name('organization.show');

    Route::get('/organizations/{organization}/animals', [OrganizationController::class, 'byOrganization'])
        ->name('organization.animals');

    Route::get('/organization/create', [OrganizationController::class, 'create'])
        ->name('organization.create');

    Route::post('/organization/create', [OrganizationController::class, 'store'])
        ->name('organization.store');

    Route::post('/organization/admin', [OrganizationController::class, 'updateUserOrganization'])
        ->name('organization.admin.update');
});
