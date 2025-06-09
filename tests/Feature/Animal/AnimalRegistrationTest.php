<?php

use App\Models\User;
use App\Models\Breeds;
use App\Models\Species;
use App\Models\Organization;
use Illuminate\Http\UploadedFile;

test('animal can be added', function () {
    Storage::fake('public');

    $organization = Organization::factory()->create();
    Species::factory()->create();
    $breed = Breeds::factory()->create();
    $user = User::factory()->create([
        'organization_id' => $organization->id,
    ]);

    $this->actingAs($user);

    $fakePhoto = UploadedFile::fake()->image('test.jpg');

    $response = $this->post('/animals', [
        'name' => 'test',
        'age' => '10',
        'weight' => '33',
        'description' => '',
        'arrival_date' => '2025-04-25',
        'gender' => 'Mâle',
        'adoption_status' => 'Disponible',
        'photo' => $fakePhoto,
        'breed_id' => $breed->id,
        'organization_id' => $organization->id,
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('animals', absolute: false));
    $response->assertStatus(302);

    $this->assertDatabaseCount('animals', 1);

    Storage::disk('public')->assertExists($fakePhoto->hashName());
});
