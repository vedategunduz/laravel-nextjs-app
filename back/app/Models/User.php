<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements AuthenticatableContract
{
    use HasFactory;

    protected $table = "users";

    protected $primary_key = 'id';

    protected $fillable = [
        'name',
        'surname',
        'email',
        'password',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value); // Parolayı hashleyerek veritabanına kaydeder
    }
}
