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

        $time_in = $this->faker->time('H:i:s');
        $time_out = $this->faker->time('H:i:s', $time_in);

        $dateTime1 = \DateTime::createFromFormat('H:i:s', $time_in);
        $dateTime2 = \DateTime::createFromFormat('H:i:s', $time_out);

        while ($dateTime2 <= $dateTime1) {
            $time_out = $this->faker->time('H:i:s', $time_in);
            $dateTime2 = \DateTime::createFromFormat('H:i:s', $time_out);
        }

        $timeDifference = $dateTime1->diff($dateTime2);

        $totalHours = $timeDifference->h;
        $totalMinutes = $timeDifference->i;

        $duration = $totalHours + $totalMinutes / 60;

        return [
            'employee_id' => $this->faker->randomElement($employeeIds),
            'date' => $date,
            'time_in' => $time_in,
            'time_out' => $time_out,
            'duration' => $duration,
        ];
    }
}
