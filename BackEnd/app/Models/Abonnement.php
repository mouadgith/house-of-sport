<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abonnement extends Model
{
    use HasFactory;

    protected $fillable = [
        'adherent_id',
        'type_abonnement_id',
        'date_debut',
        'date_fin'
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
    ];

    public function adherent()
    {
        return $this->belongsTo(Adherent::class);
    }

    public function type()
    {
        return $this->belongsTo(TypeAbonnement::class, 'type_abonnement_id');
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }
}