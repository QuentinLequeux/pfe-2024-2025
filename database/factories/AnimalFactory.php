<?php

namespace Database\Factories;

use App\Models\Breeds;
use App\Models\Animal;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnimalFactory extends Factory
{
    protected $model = Animal::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName(), // Génère un nom aléatoire.
            'age' => $this->faker->numberBetween(1, 20), // Génère un nombre entre 1 et 20.
            'gender' => $this->faker->randomElement(['Mâle', 'Femelle']), // Génère un sexe aléatoire.
            'weight' => $this->faker->numberBetween(1, 100), // Génère un poids entre 1 et 100 kg.
            'description' => $this->faker->text(), // Génère une description aléatoire.
            'arrival_date' => $this->faker->dateTimeThisDecade(), // Génère une date dans la dernière décennie.
            'adoption_status' => $this->faker->randomElement(['Disponible', 'En attente', 'Adopté']), // Génère un statut aléatoire.
            'breed_id' => Breeds::inRandomOrder()->first()?->id ?? 1, // Récupère un identifiant aléatoire valide ou 1 par défaut
            'organization_id' => $this->faker->numberBetween(1, 5), // Génère un identifiant aléatoire entre 1 et 5.
        ];
    }
}
