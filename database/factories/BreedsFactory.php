<?php

namespace Database\Factories;

use App\Models\Breeds;
use App\Models\Species;
use Illuminate\Database\Eloquent\Factories\Factory;

class BreedsFactory extends Factory
{
    protected $model = Breeds::class;

    public function definition(): array
    {
        $specie_id = Species::inRandomOrder()->first()->id;

        return [
            'breed' => $this->faker->firstName(), // Génère une race aléatoire
            'specie_id' => $specie_id,
        ];
    }
}
