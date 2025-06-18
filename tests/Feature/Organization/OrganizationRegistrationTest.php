<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

uses(Illuminate\Foundation\Testing\WithoutMiddleware::class);

test('store an organization successfully when a user is authenticated', function () {
    Role::create(['name' => 'Administrateur']);
    $user = User::factory()->create();
    $user->assignRole('Administrateur');

    $data = [
        'name' => 'SPA',
        'address' => 'Rue Peetermans 80, 4100 Seraing',
        'phone' => '+32',
        'email' => 'quent789@gmail.com',
        'iban' => 'BE12345678901234',
        'website' => 'https://petshelter.be'
    ];

    $this->actingAs($user)
        ->post(route('organization.store'), $data)
        ->assertRedirect(route('organization.show'))
        ->assertSessionHas('success', 'Organisation ajoutée avec succès !');

    $this->assertDatabaseHas('organizations',$data);
});

test('user cant create an organization without role', function () {
    Role::create(['name' => 'Utilisateur']);
    $user = User::factory()->create();
    $user->assignRole('Utilisateur');

    $data = [
        'name' => 'SPA',
        'address' => 'Rue Peetermans 80, 4100 Seraing',
        'phone' => '+32',
        'email' => 'quent789@gmail.com',
        'iban' => 'BE12345678901234',
        'website' => 'https://petshelter.be'
    ];

    $this->actingAs($user)
        ->post(route('organization.store'), $data)
        ->assertStatus(403);
});
