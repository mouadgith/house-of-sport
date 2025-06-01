<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adherent extends Model
{
    use HasFactory;

    protected $table = 'adherents';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'adresse',
        'poids',
        'condition_medicale',
        'sexe',
        'date_naissance',
        'date_inscription'
    ];

    protected $casts = [
        'date_naissance' => 'date',
        'date_inscription' => 'date',
        'poids' => 'decimal:2'
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