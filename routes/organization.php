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
            'userRole' => auth()->user()->getRoleNames(),
        ]);
    })->name('organization.show');

    Route::get('/organizations/{organization}/animals', [OrganizationController::class, 'byOrganization'])
        ->name('organization.animals');
    {/*->through(function ($animal) {
                $animal->photo_url = Storage::disk('s3')->url($animal->photo);
                return $animal;
            })]);*/}

    Route::get('/organization/create', [OrganizationController::class, 'create'])
        ->name('organization.create');

    Route::post('/organization/create', [OrganizationController::class, 'store'])
        ->name('organization.store');

    Route::get('/organization/admin', [OrganizationController::class, 'show'])
        ->name('organization.admin');

    Route::post('/organization/admin', [OrganizationController::class, 'updateUserOrganization'])
        ->name('organization.admin.update');
});
