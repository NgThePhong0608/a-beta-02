@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <span>{{ __('User : ' . $user->name . ' information') }}</span>
                            @if ($user->is_admin)
                                <a href="{{ route('users.index') }}" class="btn btn-primary">Back</a>
                            @else
                                <a href="{{ route('home') }}" class="btn btn-primary">Back</a>
                            @endif
                        </div>
                    </div>

                    <div class="card-body">
                        <form action="{{ route('users.update', $user->id) }}">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" id="name" name="name"
                                    value="{{ $user->name }}">
                            </div>

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" class="form-control" id="email" name="email"
                                    value="{{ $user->email }}">
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" name="password">
                            </div>

                            <div class="form-group">
                                <label for="password_confirmation">Confirm Password</label>
                                <input type="password" class="form-control" id="password_confirmation"
                                    name="password_confirmation">
                            </div>
                            <div class="d-flex flex-row-reverse m-10">
                                <div>
                                    <button class="m-1 btn btn-warning" type="submit">Submit</button>
                                    <form class="m-1" id="delete-form-{{ $user->id }}"
                                        action="{{ route('users.destroy', $user->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button class="btn btn-danger"
                                            onclick="confirmDelete({{ $user->id }})">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                @if (count($posts) > 0)
                    <div class="card-header mt-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <span>{{ __('User : ' . $user->name . " posts's") }}</span>
                        </div>
                    </div>
                    @include('users.post')
                @endif
            </div>
        </div>
    </div>
@endsection
