<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;

class CreatePostCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'post:create {--title=} {--content=} {--user_id=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new post';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $title = $this->option('title');
        $content = $this->option('content');
        Post::query()->create([
            'title' => $title,
            'content' => $content,
            'user_id' => 1,
        ]);
        $this->info('Post created successfully!. Title: ' . $title . ' ,Content: ' . $content);
    }
}
