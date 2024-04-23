<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello', function () {
    return "Hello World";
});

Route::middleware('auth')->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');


Route::middleware(['auth', 'permission'])->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('posts', PostController::class);
    Route::resource('comments', CommentController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/posts/myPosts', [PostController::class, 'getUserPost'])->name('posts.myPosts');
    Route::get('/posts/comment', [PostController::class, 'getPostComments'])->name('posts.comment');
    Route::get('/profile', [UserController::class, 'showProfile'])->name('profile');
    Route::get('/send-welcome-mail', [UserController::class, 'sendWelcomeMail'])->name('send-welcome-mail');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
