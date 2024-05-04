<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmployeeAttendance extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $employee = $request->user()->employee;
        $timesheets = $employee->timesheets()->paginate(10);
        return inertia('Employee/Attendance', [
            'timeSheets' => $timesheets,
            'employee' => $employee,
            'success' => session('success'),
        ]);
    }
}
