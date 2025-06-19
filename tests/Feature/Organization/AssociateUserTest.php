<?php
{/*
use App\Models\User;
use App\Models\Organization;

uses(Illuminate\Foundation\Testing\WithoutMiddleware::class);

test('associe un utilisateur à une organization', function () {
    $user = User::factory()->create();
    $organization = Organization::factory()->create();

    $this->actingAs($user)
        ->post(route('organization.admin.update'), [
        'user_id' => $user->id,
        'organization_id' => $organization->id,
    ])
        ->assertRedirect(route('organization.show'))
        ->assertSessionHas('success', 'Utilisateur associé à l\'organisation avec succès');

    expect($user->fresh()->organization_id)->toBe($organization->id);
});
*/}
