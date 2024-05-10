<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountResource;
use App\Mail\VerifyMail;
use App\Models\Employee;
use App\Models\User;
use App\Models\VerifyUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\isNull;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        $sortField = request("sort_field", 'name');
        $sortDirection = request("sort_direction", "asc");
        $accounts = $query->orderBy($sortField, $sortDirection)
            ->search()
            ->paginate(10)
            ->onEachSide(1);
        $accounts->appends(['search', request('search'), 'role' => request('role')]);
        return inertia('Account/Index', [
            'accounts' => AccountResource::collection($accounts),
            'queryParams' => request()->all(),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Account/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'role' => 'required|in:employee,admin',
            'password' => 'required|min:8|max:255|confirmed',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $path = $file->storeAs('public/uploads/avatar', $filename);
            $path = str_replace('public/', '', $path);
            $validatedData['avatar'] = $path;
        }
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
            'avatar' => $validatedData['avatar'],
        ]);

        if ($validatedData['role'] === 'employee') {
            Employee::create([
                'user_id' => $user->id,
                'fullname' => $user->name,
            ]);
        }

        $verifyUser = VerifyUser::create([
            'user_id' => $user->id,
            'token' => sha1(time()),
        ]);

        $verifyUser->save();

        Mail::to($user->email)->send(new VerifyMail($user));
        return redirect()->route('account.index')->with('success', 'Account created successfully and a verification email has been sent to email: ' . $user->email);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $account = User::findOrFail($id);
        return inertia('Account/Show', [
            'account' => new AccountResource($account),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $account = User::findOrFail($id);
        return inertia('Account/Edit', [
            'account' => new AccountResource($account),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $account = User::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'role' => 'required|in:employee,admin',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $path = $file->storeAs('public/uploads/avatar', $filename);
            $path = str_replace('public/', '', $path);
            $validatedData['avatar'] = $path;
        }

        $account->update($validatedData);
        return redirect()->route('account.index')->with('success', 'Account updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $account = User::findOrFail($id);
        if ($account->employee) {
            $account->employee->delete();
        };
        $path = 'public/' . $account->avatar;
        if (Storage::exists($path)) {
            Storage::delete($path);
        }
        $account->delete();
        return redirect()->route('account.index')->with('success', 'Account deleted successfully');
    }
}
