<?php

use App\Models\User;
use App\Models\Animal;
use App\Models\Breeds;
use App\Models\Species;
use App\Models\Organization;

test('animal can be deleted', function () {
    $organization = Organization::factory()->create();
    Species::factory()->create();
    $breed = Breeds::factory()->create();
    $user = User::factory()->create([
        'organization_id' => $organization->id,
    ]);

    $this->actingAs($user);

    $animal = Animal::factory()->create([
        'organization_id' => $organization->id,
        'breed_id' => $breed->id,
    ]);

    $response = $this->delete("/animals/$animal->id");

    $this->assertAuthenticated();
    $response->assertRedirect(route('animals', absolute: false));
    $response->assertStatus(302);

    $this->assertDatabaseMissing('animals', [
        'id' => $animal->id,
    ]);
});
