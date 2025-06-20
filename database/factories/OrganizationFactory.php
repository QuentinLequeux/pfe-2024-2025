<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrganizationFactory extends Factory
{
    protected $model = Organization::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company(), // Génère un nom aléatoire.
            'address' => $this->faker->address(), // Génère une adresse aléatoire.
            'phone' => $this->faker->phoneNumber(), // Génère un numéro de téléphone aléatoire.
            'email' => $this->faker->unique()->safeEmail(), // Génère un email aléatoire.
            'iban' => $this->faker->iban(), // Génère un numéro de compte aléatoire.
            'website' => $this->faker->url(), // génère un site web aléatoire.
        ];
    }
}
