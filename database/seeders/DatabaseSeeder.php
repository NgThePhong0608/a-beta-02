<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Employee;
use App\Models\TimeSheet;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'admin.amela',
            'email' => 'admin@admin.com',
            'role' => 'admin',
        ]);

        $users = User::factory(20)->create();

        $users->each(function ($user) {
            $employee = Employee::factory()->create(['user_id' => $user->id]);
            $employee->timeSheets()->saveMany(TimeSheet::factory(5)->make());
        });
    }
}