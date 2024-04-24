<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckinRequest;
use App\Models\TimeSheet;

class CheckinController extends Controller
{
    public function create()
    {
        return inertia('Checkin/Create', [
            'success' => session('success'),
        ]);
    }

    public function store(CheckinRequest $request)
    {

        $data = $request->validated();
        $data['employee_id'] = auth()->user()->employee->id;
        $data['time_out'] = null;
        if (!empty($data['time_in'])) {
            $timeInTimestamp = strtotime($data['time_in']);
            $eightAMTimestamp = strtotime(date('Y-m-d 08:00:00'));
            if ($timeInTimestamp > $eightAMTimestamp) {
                $data['status'] = 'Late';
            }
        }
        $query = TimeSheet::query();
        $res = $query->where('employee_id', auth()->user()->employee->id)
            ->where('date', $data['date'])
            ->first();
        if ($res) {
            $res->update($data);
        } else {
            TimeSheet::create($data);
        }
        return redirect()->route('checkout')->with('success', 'Check in successfully at: ' . $data['time_in'] . ' , '. $data['date']);
    }
}
