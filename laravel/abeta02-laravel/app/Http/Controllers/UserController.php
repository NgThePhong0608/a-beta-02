<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserController extends Controller
{

    // public function __construct()
    // {
    //     $this->authorize(UserPolicy::class);
    // }

    public function index(Request $request)
    {
        $users = User::query()->orderBy('id')->paginate(5);
        return view('users.index', compact('users'));
    }

    public function show(User $user)
    {
        $posts = $user->posts()->paginate(10);
        return view('users.show', compact('user', 'posts'));
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(UserRequest $request)
    {
        $request->validated();

        User::query()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    public function update(UserRequest $request, User $user)
    {
        $data = $request->validated();

        if ($request->hasFile('image_url')) {
            $imageUrl = $this->storeImage($request);
            $data['image_url'] = $imageUrl;
        } else {
            $data['image_url'] = $user->image_url;
        }
        $user->update($data);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User removed successfully');
    }

    public function showProfile()
    {
        $user = auth()->user();
        $posts = $user->posts()->paginate(10);
        return view('users.profile', compact('user', 'posts'));
    }

    protected function storeImage(Request $request)
    {
        if ($request->hasFile('image_url')) {
            // $path = $request->file('image_url')->store('public/users');
            $path = $request->file('image_url')->storeAs('public/users', $request->file('image_url')->getClientOriginalName());
            return substr($path, strlen('public/'));
        }
        return null; // or throw an exception if file is required
    }
}
