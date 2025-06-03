<?php

use App\Models\Animals;
use App\Models\Breeds;
use App\Models\Organizations;
use App\Models\Species;
use App\Models\User;

test('animal can be deleted', function () {
    $organization = Organizations::factory()->create();
    Species::factory()->create();
    $breed = Breeds::factory()->create();
    $user = User::factory()->create([
        'organization_id' => $organization->id,
    ]);

    $this->actingAs($user);

    $animal = Animals::factory()->create([
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
