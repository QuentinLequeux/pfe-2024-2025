<?php

namespace Database\Seeders;

use App\Models\Animals;
use App\Models\Breeds;
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
        User::factory()->create([
            'name' => 'Quentin',
            'email' => 'quentin.lequeux@student.hepl.be',
        ]); // Génère un utilisateur.

        Species::factory(5)->create(); // Génère 5 espèces aléatoires.

        Breeds::factory(5)->create(); // Génère 5 races aléatoires.

        Animals::factory(10)->create(); // Génère 10 animaux aléatoires.

        Organizations::factory(5)->create(); // Génère 5 refuges aléatoires.
    }
}
