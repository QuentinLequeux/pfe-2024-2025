<?php

namespace Database\Seeders;

use App\Models\Animals;
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

        Animals::factory(10)->create(); //Génère 10 animaux aléatoires.
    }
}
