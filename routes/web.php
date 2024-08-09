<?php

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

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('login/{provider}', 'App\Http\Controllers\Auth\LoginController@redirectToProvider');
Route::get('{provider}/callback', 'App\Http\Controllers\Auth\LoginController@handleProviderCallback');
Route::get('/upload', [\App\Http\Controllers\FileUploadController::class, 'showUploadForm']);
Route::post('/upload', [\App\Http\Controllers\FileUploadController::class, 'storeUploads']);

Route::middleware('auth')->group(function () {
    Route::resource('/products', \App\Http\Controllers\ProductController::class);
});

