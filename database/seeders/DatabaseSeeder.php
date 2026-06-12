<?php

namespace Database\Seeders;

use App\Models\HealthProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->create([
            'name' => 'Demo Patient',
            'email' => 'demo@trialmatch.test',
            'password' => Hash::make('password'),
        ]);

        HealthProfile::query()->create([
            'user_id' => $user->id,
            'condition' => 'Type 2 Diabetes',
            'age' => 52,
            'sex' => 'FEMALE',
            'country' => 'Germany',
            'city' => 'Munich',
            'keywords' => 'metformin, lifestyle',
        ]);
    }
}
