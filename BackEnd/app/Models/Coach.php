<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    use HasFactory;

    protected $table = 'coachs';

    protected $fillable = [
        'nom',
        'prenom',
        'tel',
        'adresse',
        'sexe',
        'date_naissance'
    ];

    protected $casts = [
        'date_naissance' => 'date'
    ];

    public function seances()
    {
        return $this->hasMany(Seance::class);
    }
}