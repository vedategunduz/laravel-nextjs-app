<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserLoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'email|required|',
            'password' => 'string|required|min:8'
        ];
    }

    public function messages(): array
    {
        return [
            'email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'email.required' => 'E-posta alanı zorunludur.',

            'password.string' => 'Şifre sadece metin olmalıdır.',
            'password.required' => 'Şifre alanı zorunludur.',
            'password.min' => 'Şifre en az 8 karakter olmalıdır.',
        ];
    }
}
