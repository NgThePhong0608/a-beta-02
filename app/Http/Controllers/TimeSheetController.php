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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('TimeSheet/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'employee_id' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        TimeSheet::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(TimeSheet $timeSheet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TimeSheet $timeSheet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TimeSheet $timeSheet)
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
