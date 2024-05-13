<?php

namespace App\Console\Commands;

use App\Models\Employee;
use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class SendNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(Request $request)
    {
        $data = $request->all();
        $department = $data['user'];
        $employees = Employee::query()->where('department', $department)->get();
        foreach ($employees as $employee) {
            Notification::send($employee->user, new SendNotification($data));
        }
    }
}
