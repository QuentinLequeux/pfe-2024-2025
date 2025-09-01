<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Animal;
use App\Models\Species;
use App\Models\Organization;
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
            'name' => 'Administrateur',
            'email' => 'administrateur@petshelter.be',
        ]);

        $user->assignRole('Administrateur');

        $species = ['Chien', 'Chat'];

        foreach ($species as $specie) {
            Species::factory()->create(['specie' => $specie]);
        }

        $this->call([
           BreedSeeder::class,
        ]);

        $organizations = [
            [
                'name' => 'HEPL Seraing',
                'address' => 'Rue Peetermans 80, 4100 Seraing',
                'phone' => '+3242797500',
                'email' => 'seraing@provincedeliege.be',
                'iban' => 'BE12345678901234',
                'website' => 'https://hepl.be/seraing',
            ],
            [
                'name' => 'HEPL Campus 2000',
                'address' => 'Avenue Montesquieu 6, 4101 Jemeppe-sur-Meuse',
                'phone' => '+3242795476',
                'email' => '2000@provincedeliege.be',
                'iban' => 'BE22345678901234',
                'website' => 'https://hepl.be/2000',
            ],
            [
                'name' => 'HEPL Barbou',
                'address' => 'Quai du Barbou 2, 4020 Liège',
                'phone' => '+3242797805',
                'email' => 'barbou@provincedeliege.be',
                'iban' => 'BE32345678901234',
                'website' => 'https://hepl.be/barbou',
            ],
            [
                'name' => 'HEPL Beeckman',
                'address' => 'Rue Beeckmann 19, 4000 Liège',
                'phone' => '+3242795598',
                'email' => 'beeckman@provincedeliege.be',
                'iban' => 'BE42345678901234',
                'website' => 'https://hepl.be/beeckman',
            ],
            [
                'name' => 'HEPL Gloesener',
                'address' => 'Quai Gloesener 6, 4020 Liège',
                'phone' => '+3242796400',
                'email' => 'gloesener@provincedeliege.be',
                'iban' => 'BE52345678901234',
                'website' => 'https://hepl.be/gloesener',
            ],
            [
                'name' => 'HEPL Huy',
                'address' => 'Avenue Delchambre 13, 4500 Huy',
                'phone' => '+3242793187',
                'email' => 'huy@provincedeliege.be',
                'iban' => 'BE62345678901234',
                'website' => 'https://hepl.be/huy',
            ],
            [
                'name' => 'HEPL La Reid',
                'address' => 'Rue Haftay 21, 4910 La Reid',
                'phone' => '+3242794080',
                'email' => 'lareid@provincedeliege.be',
                'iban' => 'BE72345678901234',
                'website' => 'https://hepl.be/lareid',
            ],
            [
                'name' => 'HEPL Kurth',
                'address' => 'Quai Godefroid Kurth 100, 4020 Liège',
                'phone' => '+3242797805',
                'email' => 'kurth@provincedeliege.be',
                'iban' => 'BE82345678901234',
                'website' => 'https://hepl.be/kurth',
            ],
            [
                'name' => 'HEPL Verviers',
                'address' => 'Rue aux Laines 21, 4800 Verviers',
                'phone' => '+3242794500',
                'email' => 'verviers@provincedeliege.be',
                'iban' => 'BE92345678901234',
                'website' => 'https://hepl.be/verviers',
            ],
            [
                'name' => 'HEPL Avroy',
                'address' => 'Boulevard d\'Avroy 61, 4000 Liège',
                'phone' => '+3242794518',
                'email' => 'avroy@provincedeliege.be',
                'iban' => 'BE02345678901234',
                'website' => 'https://hepl.be/avroy',
            ]
        ];

        foreach ($organizations as $organization) {
            $organization = Organization::factory()->create($organization);
            Animal::factory()->count(20)->create(['organization_id' => $organization->id]);
        }
    }
}

// Factory utilisateurs
