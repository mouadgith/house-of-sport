<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'telephone',
        'email'
    ];

    public function seances()
    {
        return $this->hasMany(Seance::class);
    }
}