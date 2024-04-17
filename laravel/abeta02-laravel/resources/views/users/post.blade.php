<div class="card-body mt-12">
    @foreach ($posts as $post)
        <div class="card m-4">
            <div class="card-body">
                <div class="card-body">
                    <h5 class="card-title">{{ $post->id . ' | ' . $post->title }}</h5>
                    <p class="card-text">{{ $post->content }}</p>
                    <div class="d-flex flex-row-reverse">
                        <a href="{{ route('posts.show', $post->id) }}" class="m-1 btn btn-primary">View</a>
                        <a href="{{ route('posts.edit', $post->id) }}" class="m-1 btn btn-warning">Edit</a>
                        <form class="m-1" id="delete-form-{{ $post->id }}"
                            action="{{ route('posts.destroy', $post->id) }}" method="POST" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button class="btn btn-danger" onclick="confirmDelete({{ $post->id }})">Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    @endforeach
    {{ $posts->links() }}
</div>
