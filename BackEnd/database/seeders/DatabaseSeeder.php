<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'name' => 'Mouad',
            'email' => 'mouad@gmail.com',
            'password' => Hash::make('2025')
        ]); 
        
        User::create([
            'name' => 'e',
            'email' => 'e@e.e',
            'password' => Hash::make('ee')
        ]);
    }
}
