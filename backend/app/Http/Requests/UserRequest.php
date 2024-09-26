<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|required|max:255',
            'surname' => 'string|required|max:255',
            'email' => 'email|required|unique:myusers',
            'password' => 'string|required|min:8'
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'Ad sadece metin içermelidir.',
            'name.required' => 'Ad alanı zorunludur.',
            'name.max' => 'Ad 255 karakteri geçemez.',

            'surname.string' => 'Soyad sadece metin içermelidir.',
            'surname.required' => 'Soyad alanı zorunludur.',
            'surname.max' => 'Soyad 255 karakteri geçemez.',

            'email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'email.required' => 'E-posta alanı zorunludur.',
            'email.unique' => 'Bu e-posta zaten kayıtlı.',

            'password.string' => 'Şifre sadece metin olmalıdır.',
            'password.required' => 'Şifre alanı zorunludur.',
            'password.min' => 'Şifre en az 8 karakter olmalıdır.',
        ];
    }
}
