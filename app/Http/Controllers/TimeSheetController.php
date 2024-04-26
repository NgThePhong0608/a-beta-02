<?php

namespace App\Http\Controllers;

use App\Http\Resources\TimeSheetResource;
use App\Models\TimeSheet;
use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Time;

class TimeSheetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = TimeSheet::query()->with('employee');
        $sortField = request('sort_field', 'date');
        $sortDirection = request('sort_direction', 'asc');


        $timesheet = $query->orderBy($sortField, $sortDirection)
            ->filter($query,request('search'))
            ->paginate(10)
            ->onEachSide(1);

        return inertia('TimeSheet/Index', [
            'timesheet' => TimeSheetResource::collection($timesheet),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $timeSheet = TimeSheet::query()->findOrFail($id);
        return inertia('TimeSheet/Show', [
            'timeSheet' => new TimeSheetResource($timeSheet),
        ]);
    }

    public function edit(string $id)
    {
        $timeSheet = TimeSheet::query()->findOrFail($id);
        return inertia('TimeSheet/Edit', [
            'timeSheet' => new TimeSheetResource($timeSheet),
        ]);
    }
    public function update(Request $request, string $id)
    {
        $timeSheet = TimeSheet::query()->findOrFail($id);
        $data = $request->validate([
            'date' => 'required',
            'time_in' => 'required',
            'time_out' => 'required',
            'duration' => 'required',
        ]);
        $timeSheet->update($data);
        return redirect()->route('timesheet.index')->with('success', 'TimeSheet updated.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $timeSheet = TimeSheet::query()->findOrFail($id);
        $timeSheet->delete();
        return redirect()->route('timesheet.index')->with('success', 'TimeSheet deleted.');
    }
}
