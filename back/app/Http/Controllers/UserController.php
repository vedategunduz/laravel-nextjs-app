<?php

namespace App\Http\Controllers;

// *Requests
//use Illuminate\Http\Request;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;

// *Models
use App\Models\User;

// *Other
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(UserLoginRequest $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {

            $request->session()->regenerate();

            return response()->json(['success' => 'Giriş başarılı']);
        }

        return response()->json(['error' => 'Kayıt bulunamadı.']);
    }

    public function register(UserRegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        Auth::login($user);

        return response()->json(['success' => 'Kayıt başarılı.']);
    }
}
