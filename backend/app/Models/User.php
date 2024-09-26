<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

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
