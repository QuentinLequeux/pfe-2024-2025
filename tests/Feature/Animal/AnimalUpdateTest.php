<?php

use App\Models\Animals;
use App\Models\Breeds;
use App\Models\Organizations;
use App\Models\Species;
use App\Models\User;

test('animal can be updated', function () {
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

    $response = $this->patch("/animals/$animal->id", [
        'name' => 'test',
        'age' => '11',
        'weight' => '32',
        'description' => '',
        'arrival_date' => '2025-04-24',
        'gender' => 'Femelle',
        'adoption_status' => 'Adopté',
        'breed_id' => $breed->id,
        'organization_id' => $organization->id,
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('animals', absolute: false));
    $response->assertStatus(302);
});
