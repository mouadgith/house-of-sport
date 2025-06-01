<?php

namespace Database\Seeders;

use App\Models\Adherent;
use Illuminate\Database\Seeder;

class AdherentSeeder extends Seeder
{
    public function run(): void
    {
        $noms = [
            'Alaoui', 'Benali', 'Chraibi', 'Daoudi', 'El Fathi',
            'Hassani', 'Idrissi', 'Kabbaj', 'Lahlou', 'Mansouri',
            'Naciri', 'Ouali', 'Rahmani', 'Saidi', 'Tazi'
        ];

        $prenoms = [
            'Mohammed', 'Ahmed', 'Fatima', 'Karim', 'Sara',
            'Youssef', 'Amina', 'Hassan', 'Laila', 'Omar',
            'Nadia', 'Rachid', 'Samira', 'Tarik', 'Zineb'
        ];

        $sexes = ['M', 'F'];
        $adresses = [
            'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger',
            'Agadir', 'Meknès', 'Oujda', 'Tétouan', 'Laâyoune'
        ];

        for ($i = 0; $i < 10; $i++) {
            $sexe = $sexes[array_rand($sexes)];
            $dateNaissance = fake()->dateTimeBetween('-50 years', '-18 years')->format('Y-m-d');
            
            Adherent::create([
                'nom' => $noms[array_rand($noms)],
                'prenom' => $prenoms[array_rand($prenoms)],
                'email' => fake()->unique()->safeEmail(),
                'telephone' => '+2126' . fake()->numerify('########'),
                'adresse' => $adresses[array_rand($adresses)],
                'poids' => fake()->numberBetween(45, 100),
                'condition_medicale' => fake()->randomElement(['sans', 'Diabète', 'Hypertension', 'Asthme', 'Allergie']),
                'sexe' => $sexe,
                'date_naissance' => $dateNaissance,
                'date_inscription' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d')
            ]);
        }
    }
} 