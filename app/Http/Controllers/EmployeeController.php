<?php

namespace App\Http\Controllers;

use App\Events\CreateUserForEmployee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\TimeSheetResource;
use App\Mail\NotifyResetPasswordMail;
use App\Mail\VerifyMail;
use App\Models\Employee;
use App\Models\User;
use App\Models\VerifyUser;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Employee::query()->with("user");
        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "desc");

        $employees = $query
            ->orderBy($sortField, $sortDirection)
            ->search($query)
            ->paginate(10)
            ->onEachSide(1);

        $employees->appends(['search' => request('search'), 'department' => request('department')]);
        return inertia("Employee/Index", [
            'employees' => EmployeeResource::collection($employees),
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

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $path = $file->storeAs('public/uploads/avatar', $filename);
            $path = str_replace('public/', '', $path);
            $validatedData['avatar'] = $path;
        }
        // dd($validatedData);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'avatar' => $validatedData['avatar'], // default avatar if no avatar is uploaded
            'role' => 'employee',
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

        $verifyUser = VerifyUser::create([
            'user_id' => $user->id,
            'token' => sha1(time()),
        ]);

        $verifyUser->save();

        Mail::to($user->email)->send(new VerifyMail($user));

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
            "timeSheets" => TimeSheetResource::collection($employee->timeSheets),
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
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $path = $file->storeAs('public/uploads/avatar', $filename);
            $path = str_replace('public/', '', $path);
            $validatedData['avatar'] = $path;
        }
        $user = $employee->user;
        // dd($validatedData);

        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'avatar' => $validatedData['avatar'],
        ]);

        $user->save();

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
        if (Storage::exists($employee->user->avatar)) {
            Storage::delete($employee->user->avatar);
        }
        $employee->user->delete();
        $employee->delete();
        return redirect()->route('employee.index')->with('success', 'Employee deleted.');
    }
    public function verifyUser($token)
    {
        $verifyUser = VerifyUser::where('token', $token)->first();
        if (isset($verifyUser)) {
            $user = $verifyUser->user;
            if (!$user->verified) {
                $verifyUser->user->email_verified_at = now();
                $verifyUser->user->save();
                auth()->login($verifyUser->user);
                $status = "Your e-mail is verified. You can now login.";
            } else {
                $status = "Your e-mail is already verified. You can now login.";
            }
        } else {
            return redirect()->route('login')->with('warning', "Sorry your email cannot be identified.");
        }
        return redirect()->route('login')->with('status', $status);
    }

    public function resetPassword(Employee $employee)
    {
        $employee->user->password = Hash::make(Employee::$DEFAULT_PASSWORD);
        $employee->user->save();
        Mail::to($employee->user->email)->send(new NotifyResetPasswordMail($employee->user));
        return redirect()->route('employee.index')->with('success', 'Password reset.');
    }
}
