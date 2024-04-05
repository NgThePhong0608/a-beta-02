<?php

namespace App\Listeners;

use App\Events\CreateUserForEmployee;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateUserForEmployeeListener implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CreateUserForEmployee $event): void
    {
        $event->user->sendEmailVerificationNotification();
    }
}
