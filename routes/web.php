<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TimeSheetController;
use App\Http\Controllers\CheckinController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\EmployeeAttendance;
use App\Http\Controllers\NotificationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'success' => session('success'),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/user/verify/{token}', [EmployeeController::class, 'verifyUser'])->name('user.verify');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('employee', EmployeeController::class);
    Route::resource('timesheet', TimeSheetController::class);
    Route::resource('account', AccountController::class);

    Route::post(
        '/notification/{notification}/mark-as-read',
        [NotificationController::class, 'markAsRead']
    )->name('notification.mark-as-read');
    Route::resource('notification', NotificationController::class);
    Route::get('/checkin', [CheckinController::class, 'create'])->name('checkin');
    Route::post('/checkin', [CheckinController::class, 'store'])->name('checkin.store');

    Route::get('/checkout', [CheckoutController::class, 'create'])->name('checkout');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::get('/attendance', EmployeeAttendance::class)->name('attendance');
    Route::put('/employee/reset-password/{employee}', [EmployeeController::class, 'resetPassword'])->name('employee.reset-password');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
