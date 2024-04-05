<?php

namespace Database\Factories;

use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TimeSheet>
 */
class TimeSheetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $employeeIds = Employee::pluck('id')->toArray();

        $date = $this->faker->dateTimeBetween('-30 days', 'now')->format('Y-m-d');

        $startTime = $this->faker->time('H:i:s');
        $endTime = $this->faker->time('H:i:s', $startTime);

        $start = Carbon::parse($startTime);
        $end = Carbon::parse($endTime);

        $duration = $end->diff($start)->format('%H:%I:%S');

        return [
            'employee_id' => $this->faker->randomElement($employeeIds),
            'date' => $date,
            'time_in' => $this->faker->time(),
            'time_out' => $this->faker->time(),
            'duration' => $duration,
        ];
    }
}
