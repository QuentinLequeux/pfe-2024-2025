<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Species;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'Utilisateur']);
        Role::create(['name' => 'Administrateur']);

        $user = User::factory()->create([
            'name' => 'Quentin',
            'email' => 'quentin.lequeux@student.hepl.be',
        ]);

        $user->assignRole('Administrateur');

        $species = ['Chien', 'Chat'];

        foreach ($species as $specie) {
            Species::factory()->create(['specie' => $specie]);
        }

        $this->call([
           BreedSeeder::class,
        ]);
    }
}
