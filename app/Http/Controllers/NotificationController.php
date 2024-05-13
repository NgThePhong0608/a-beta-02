<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\User;
use App\Notifications\SendNotification;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications()
            ->orderBy('read_at', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();
        // dd($notifications);

        return inertia('Notification/Index', [
            'notifications' => $notifications
        ]);
    }

    public function create()
    {
        return inertia('Notification/Create');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $department = $data['user'];
        $employees = Employee::query()->where('department', $department)->get();
        foreach ($employees as $employee) {
            Notification::send($employee->user, new SendNotification($data));
        }
        // call schedule 
        // $schedule = app(Schedule::class);
        // $schedule->command('send:notification')->cron($data['sendDate'], $data['sendTime'])->withoutOverlapping();

        return redirect()->route('notification.index')->with('success', 'Notification sent successfully');
    }

    public function show(string $id)
    {
        $notification = auth()->user()->notifications()->where('id', $id)->first();
        // dd($notification);
        if ($notification) {
            $notification->markAsRead();
            return inertia('Notification/Show', [
                'notification' => $notification
            ]);
        }
        return redirect()->route('notification.index')->with('success', 'Notification not found');
    }

    public function getAllNoti()
    {
        $noti = auth()->user()->notifications;
        return response()->json($noti);
    }

    public function markAsRead(string $id)
    {
        $noti = auth()->user()->notifications()->where('id', $id)->first();
        if ($noti) {
            $noti->markAsRead();
            return redirect()->route('notification.index')->with('success', 'Notification marked as read');
        }
        return redirect()->route('notification.index')->with('success', 'Notification not found');
    }
}
