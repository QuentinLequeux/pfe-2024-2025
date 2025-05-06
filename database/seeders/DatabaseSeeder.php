<?php

namespace Database\Seeders;

use App\Models\Animals;
use App\Models\Organizations;
use App\Models\Species;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Organizations::factory(5)->create(); // Génère cinq refuges aléatoires.

        User::factory()->create([
            'name' => 'Quentin',
            'email' => 'quentin.lequeux@student.hepl.be',
        ]); // Génère un utilisateur.

        $species = ['Chien', 'Chat'];

        foreach ($species as $specie) {
            Species::factory()->create(['specie' => $specie]);
        }

        $this->call([
           BreedSeeder::class,
        ]);

        Animals::factory(15)->create(); // Génère 10 animaux aléatoires.
    }
}
