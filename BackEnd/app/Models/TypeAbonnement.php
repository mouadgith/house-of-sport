<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeAbonnement extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'duree_jours',
        'prix',
        'description'
    ];

    public function abonnements()
    {
        return $this->hasMany(Abonnement::class, 'type_abonnement');
    }
}