<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = Employee::query()->with("user");

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $employees = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Employee/Index", [
            "employees" => EmployeeResource::collection($employees),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Employee/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $validatedData = $request->validated();
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make('password'),
        ]);
        $validatedData['user_id'] = $user->id;
        $employee = Employee::make([
            'fullname' => $validatedData['fullname'],
            'age' => $validatedData['age'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'city' => $validatedData['city'],
            'country' => $validatedData['country'],
            'department' => $validatedData['department'],
            'user_id' => $user->id,
        ]);
        $employee->save();
        return redirect()->route('employee.index')->with(
            'success',
            'Employee created. An email has been sent to the employee for email verification.'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return inertia("Employee/Show", [
            "employee" => new EmployeeResource($employee),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return inertia("Employee/Edit", [
            "employee" => new EmployeeResource($employee),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $validatedData = $request->validated();

        $user = $employee->user;

        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
        ]);

        $employee->update([
            'fullname' => $validatedData['fullname'],
            'age' => $validatedData['age'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'city' => $validatedData['city'],
            'country' => $validatedData['country'],
            'department' => $validatedData['department'],
            'user_id' => $user->id,
        ]);

        return redirect()->route('employee.index')->with('success', 'Employee updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employee.index')->with('success', 'Employee deleted.');
    }
}
