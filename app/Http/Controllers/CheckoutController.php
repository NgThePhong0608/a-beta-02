<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\TimeSheet;
use Illuminate\Support\Facades\DB;

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
        DB::beginTransaction();
        try {
            $id = auth()->user()->employee->id ?? null;
            if (!$id) {
                return redirect()->route('dashboard')->with('error', 'Employee not found');
            }
            $query = TimeSheet::query();
            $res = $query->where('employee_id', $id )
                ->where('date', date('Y-m-d'))
                ->first();
            $data = $request->validated();
            $data['duration'] = $this->calculateDuration($res->time_in, $data['time_out']);
            $res->update($data);
            DB::commit();
            return redirect()->route('dashboard')->with('success', 'Check out successfully');
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }

    public function calculateDuration($time_in, $time_out): string
    {
        $dateTime1 = \DateTime::createFromFormat('H:i:s', $time_in);
        $dateTime2 = \DateTime::createFromFormat('H:i:s', $time_out);

        $timeDifference = $dateTime1->diff($dateTime2);
        return $timeDifference->h;
    }
}
