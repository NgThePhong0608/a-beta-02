<?php

namespace App\Http\Controllers;

use App\Http\Resources\TimeSheetResource;
use App\Models\TimeSheet;
use Illuminate\Http\Request;

class TimeSheetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = TimeSheet::query()->with('employee');
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'asc');


        $timesheets = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('TimeSheet/Index', [
            'timesheets' => TimeSheetResource::collection($timesheets),
            'success' => session('success'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TimeSheet $timeSheet)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TimeSheet $timeSheet)
    {
        //
    }
}
