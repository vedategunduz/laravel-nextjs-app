<?php

use Illuminate\Support\Facades\Route;

// *Controllers
use App\Http\Controllers\UserController;

Route::get('/api/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});


Route::get('/', function () {
    return view('deneme');
});

Route::post('/api/login', [UserController::class, 'login']);
Route::post('/api/register', [UserController::class, 'register'])->name('register');
