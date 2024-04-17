@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <span>{{ __('Comments') }}</span>
                            <a href="{{ route('posts.index') }}" class="btn btn-primary">Back</a>
                        </div>
                    </div>

                    <div class="card-body">
                        @foreach ($comments as $comment)
                            <div class="card m-4" style="width: full">
                                <div class="card-body">
                                    <h5 class="card-title">{{ $comment->user->name }}</h5>
                                    <p class="card-text">{{ $comment->comment }}</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
                {{ $comments->links() }}
            </div>
        </div>
    </div>
@endsection
