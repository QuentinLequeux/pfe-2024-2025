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
            'name' => $this->faker->name(),
            'age' => $this->faker->numberBetween(1, 20),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'weight' => $this->faker->randomFloat(1, 1, 100),
            'description' => $this->faker->text(),
            'arrival_date' => $this->faker->date(),
            'adoption_status' => $this->faker->randomElement(['available', 'adopted', 'pending']),
        ];
    }
}
