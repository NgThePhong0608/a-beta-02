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


        $dateTime1 = \DateTime::createFromFormat('H:i:s', $startTime);
        $dateTime2 = \DateTime::createFromFormat('H:i:s', $endTime);

        $timeDifference = $dateTime1->diff($dateTime2);

        $duration = $timeDifference->h;

        return [
            'employee_id' => $this->faker->randomElement($employeeIds),
            'date' => $date,
            'time_in' => $this->faker->time(),
            'time_out' => $this->faker->time(),
            'duration' => $duration,
        ];
    }
}
