<?php

namespace App\Http\Controllers;

use App\Models\Abonnement;
use App\Models\Adherent;
use App\Models\TypeAbonnement;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AbonnementController extends Controller
{
    public function index()
    {
        return Abonnement::with(['adherent', 'type', 'paiements'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'adherent_id' => 'required|exists:adherents,id',
            'type_abonnement_id' => 'required|exists:types_abonnement,id',
            'date_debut' => 'nullable|date',
        ]);

        $type = TypeAbonnement::find($validated['type_abonnement_id']);
        $dateDebut = $validated['date_debut'] ?? Carbon::today();

        $abonnement = Abonnement::create([
            'adherent_id' => $validated['adherent_id'],
            'type_abonnement_id' => $validated['type_abonnement_id'],
            'date_debut' => $dateDebut,
            'date_fin' => $dateDebut->copy()->addDays($type->duree_jours),
        ]);

        return response()->json($abonnement, 201);
    }

    public function show(Abonnement $abonnement)
    {
        return $abonnement->load(['adherent', 'type', 'paiements']);
    }

    public function update(Request $request, Abonnement $abonnement)
    {
        $validated = $request->validate([
            'type_abonnement_id' => 'sometimes|required|exists:types_abonnement,id',
            'date_debut' => 'sometimes|required|date',
        ]);

        if (isset($validated['type_abonnement_id']) || isset($validated['date_debut'])) {
            $type = isset($validated['type_abonnement_id']) 
                ? TypeAbonnement::find($validated['type_abonnement_id'])
                : $abonnement->type;

            $dateDebut = $validated['date_debut'] ?? $abonnement->date_debut;

            $validated['date_fin'] = Carbon::parse($dateDebut)->addDays($type->duree_jours);
        }

        $abonnement->update($validated);

        return response()->json($abonnement);
    }

    public function destroy(Abonnement $abonnement)
    {
        $abonnement->delete();

        return response()->json(null, 204);
    }
}