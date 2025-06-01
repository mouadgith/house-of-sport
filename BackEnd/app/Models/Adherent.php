<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adherent extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'date_naissance',
        'sexe',
        'telephone',
        'poids',
        'date_inscription'
    ];

    protected $casts = [
        'date_naissance' => 'date',
        'date_inscription' => 'date',
    ];

    public function abonnements()
    {
        return $this->hasMany(Abonnement::class);
    }

    public function seances()
    {
        return $this->belongsToMany(Seance::class, 'adherent_seance');
    }
}