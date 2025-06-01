<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'abonnement_id',
        'date_paiement',
        'statut',
        'montant'
    ];

    protected $casts = [
        'date_paiement' => 'datetime',
    ];

    public function abonnement()
    {
        return $this->belongsTo(Abonnement::class);
    }
}
