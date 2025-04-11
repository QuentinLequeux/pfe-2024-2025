<?php

namespace Database\Factories;

use App\Models\Animals;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnimalsFactory extends Factory
{
    protected $model = Animals::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName(), // Génère un nom aléatoire.
            'age' => $this->faker->numberBetween(1, 20), // Génère un nombre entre 1 et 20.
            'gender' => $this->faker->randomElement(['male', 'female']), // Génère un sexe aléatoire.
            'weight' => $this->faker->randomFloat(1, 1, 100), // Génère un poids entre 1 et 100 kg.
            'description' => $this->faker->text(), // Génère une description aléatoire.
            'arrival_date' => $this->faker->dateTimeThisDecade(), // Génère une date dans la dernière décennie.
            'adoption_status' => $this->faker->randomElement(['available', 'adopted', 'pending']), // Génère un statut aléatoire.
            'breed_id' => $this->faker->numberBetween(1, 5), // Génère un identifiant aléatoire entre 1 et 5.
            'organization_id' => $this->faker->numberBetween(1, 5), // Génère un identifiant aléatoire entre 1 et 5.
        ];
    }
}
