<?php

namespace App\Http\Controllers;

use App\Models\Seance;
use App\Models\Adherent;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SeanceController extends Controller
{
    public function index(Request $request)
    {
        $query = Seance::with(['typeSeance', 'coach', 'salle', 'adherents']);

        if ($request->has('from')) {
            $query->where('date_heure', '>=', $request->from);
        }

        if ($request->has('to')) {
            $query->where('date_heure', '<=', $request->to);
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type_seance_id' => 'required|exists:types_seance,id',
            'coach_id' => 'required|exists:coachs,id',
            'salle_id' => 'required|exists:salles,id',
            'date_heure' => 'required|date',
            'places_max' => 'required|integer|min:1',
        ]);

        $seance = Seance::create($validated);

        return response()->json($seance->load(['typeSeance', 'coach', 'salle']), 201);
    }

    public function show(Seance $seance)
    {
        return $seance->load(['typeSeance', 'coach', 'salle', 'adherents']);
    }

    public function update(Request $request, Seance $seance)
    {
        $validated = $request->validate([
            'type_seance_id' => 'sometimes|required|exists:types_seance,id',
            'coach_id' => 'sometimes|required|exists:coachs,id',
            'salle_id' => 'sometimes|required|exists:salles,id',
            'date_heure' => 'sometimes|required|date',
            'places_max' => 'sometimes|required|integer|min:1',
            'annulee' => 'sometimes|boolean',
        ]);

        $seance->update($validated);

        return response()->json($seance->load(['typeSeance', 'coach', 'salle']));
    }

    public function destroy(Seance $seance)
    {
        $seance->delete();

        return response()->json(null, 204);
    }

    public function registerAdherent(Seance $seance, Adherent $adherent)
    {
        if ($seance->adherents()->where('adherent_id', $adherent->id)->exists()) {
            return response()->json(['message' => 'Adhérent déjà inscrit'], 400);
        }

        if ($seance->adherents()->count() >= $seance->places_max) {
            return response()->json(['message' => 'Plus de places disponibles'], 400);
        }

        $seance->adherents()->attach($adherent->id);

        return response()->json(['message' => 'Inscription réussie']);
    }

    public function unregisterAdherent(Seance $seance, Adherent $adherent)
    {
        $seance->adherents()->detach($adherent->id);

        return response()->json(['message' => 'Désinscription réussie']);
    }
}