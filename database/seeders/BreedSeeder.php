<?php

namespace Database\Seeders;

use App\Models\Breeds;
use Illuminate\Database\Seeder;

class BreedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = database_path('data/breeds.json');
        $fileContent = file_get_contents($path);

        $breedsData = json_decode($fileContent, true);

        $breeds = array_merge($breedsData['dogs'] ?? [], $breedsData['cats'] ?? []);

        foreach ($breeds as $breed) {
            Breeds::create([
                'breed' => $breed['breed'],
                'specie_id' => $breed['specie_id'],
            ]);
        }
    }
}
