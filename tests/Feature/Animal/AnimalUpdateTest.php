<?php
{/*
use App\Models\User;
use App\Models\Animal;
use App\Models\Breeds;
use App\Models\Species;
use App\Models\Organization;

test('animal can be updated', function () {
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

    $this->assertDatabaseHas('animals', [
        'id' => $animal->id,
        'age' => '11',
        'weight' => '32',
        'arrival_date' => '2025-04-24',
        'gender' => 'Femelle',
        'adoption_status' => 'Adopté',
    ]);
});
*/}
