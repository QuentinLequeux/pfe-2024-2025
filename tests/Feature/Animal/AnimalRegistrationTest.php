<?php

use App\Models\Breeds;
use App\Models\Organizations;
use App\Models\Species;
use App\Models\User;

test('animal can be added', function () {
    $organization = Organizations::factory()->create();
    Species::factory()->create();
    $breed = Breeds::factory()->create();
    $user = User::factory()->create([
        'organization_id' => $organization->id,
    ]);

    $this->actingAs($user);

    $response = $this->post('/animals', [
        'name' => 'test',
        'age' => '10',
        'weight' => '33',
        'description' => '',
        'arrival_date' => '2025-04-25',
        'gender' => 'Mâle',
        'adoption_status' => 'Disponible',
        'breed_id' => $breed->id,
        'organization_id' => $organization->id,
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('animals', absolute: false));
    $response->assertStatus(302);
});
