<div class="card-body mt-12">
    @foreach ($comments as $comment)
        <div class="card m-4" style="width: full">
            <div class="card-body">
                <h5 class="card-title">{{ $comment->user->name }}</h5>
                <p class="card-text">{{ $comment->comment }}</p>
            </div>
        </div>
    @endforeach
    {{ $comments->links() }}
</div>
