@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    @if (session('success'))
                        <div class="alert alert-success" role="alert">
                            {{ session('success') }}
                        </div>
                    @endif
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <span>{{ __('Posts') }}</span>
                            <a href="{{ route('posts.create') }}" class="btn btn-primary">Add Post</a>
                        </div>
                    </div>


                    <div class="card-body">
                        @foreach ($posts as $post)
                            <div class="card m-4" style="width: full">
                                <div class="card-body">
                                    <h5 class="card-title">{{ $post->id . ' | ' . $post->title }}</h5>
                                    <p class="card-text">{{ $post->content }}</p>
                                    <div class="d-flex flex-row-reverse">
                                        <a href="{{ route('posts.show', $post->id) }}" class="m-1 btn btn-primary">View</a>
                                        <a href="{{ route('posts.edit', $post->id) }}" class="m-1 btn btn-warning">Edit</a>
                                        <form class="m-1" id="delete-form-{{ $post->id }}"
                                            action="{{ route('posts.destroy', $post->id) }}" method="POST"
                                            class="d-inline">
                                            @csrf
                                            @method('DELETE')
                                            <button class="btn btn-danger"
                                                onclick="confirmDelete({{ $post->id }})">Delete</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                        {{ $posts->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        function confirmDelete(postId) {
            if (confirm('Are you sure you want to delete this post?')) {
                document.getElementById('delete-form-' + postId).submit();
            }
        }
    </script>
@endsection
