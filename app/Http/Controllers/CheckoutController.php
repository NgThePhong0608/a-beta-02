<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\TimeSheet;

class CheckoutController extends Controller
{
    public function create()
    {
        $query = TimeSheet::query();
        $res = $query->where('employee_id', auth()->user()->employee->id)->first();
        $time_in = $res->time_in ?? null;
        return inertia('Checkout/Create', [
            'success' => session('success'),
            'time_in' => $time_in
        ]);
    }

    public function store(CheckoutRequest $request)
    {
        $id = auth()->user()->employee->id ?? null;
        if (!$id) {
            return redirect()->route('dashboard')->with('error', 'Employee not found');
        }
        $query = TimeSheet::query();
        $res = $query->where('employee_id', $id)
            ->where('date', date('Y-m-d'))
            ->first();
        $data = $request->validated();
        $data['time_in'] = $res->time_in;
        $data['duration'] = $this->calculateDuration($res->time_in, $data['time_out']);
        if ($data['duration'] < 8) {
            $data['status'] = 'Early';
        } else {
            if ($this->calculateDuration($res->time_out, '18:00:00') > 0) {
                $data['status'] = 'OT '.$this->calculateDuration($res->time_out, $data['time_out']).'h';
            } else {
                $data['status'] = 'On Time';
            }
        }
        $res->update($data);
        return redirect()->route('dashboard')->with('success', 'Check out successfully');

    }

    public function calculateDuration($time_in, $time_out): string
    {
        $dateTime1 = \DateTime::createFromFormat('H:i:s', $time_in);
        $dateTime2 = \DateTime::createFromFormat('H:i:s', $time_out);

        $timeDifference = $dateTime1->diff($dateTime2);
        return $timeDifference->h;
    }
}
