<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_seance_id',
        'coach_id',
        'salle_id',
        'date_heure',
        'places_max',
        'annulee'
    ];

    protected $casts = [
        'date_heure' => 'datetime',
        'annulee' => 'boolean',
    ];

    public function typeSeance()
    {
        return $this->belongsTo(TypeSeance::class, 'type_seance_id');
    }

    public function coach()
    {
        return $this->belongsTo(Coach::class);
    }

    public function salle()
    {
        return $this->belongsTo(Salle::class);
    }

    public function adherents()
    {
        return $this->belongsToMany(Adherent::class, 'adherent_seance');
    }
}
