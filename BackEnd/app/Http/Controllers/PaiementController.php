<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use App\Models\Abonnement;
use Illuminate\Http\Request;

class PaiementController extends Controller
{
    public function index()
    {
        return Paiement::with('abonnement')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'abonnement_id' => 'required|exists:abonnements,id',
            'montant' => 'required|numeric',
            'statut' => 'nullable|in:Payé,En attente,Annulé',
            'date_paiement' => 'nullable|date',
        ]);

        $validated['statut'] = $validated['statut'] ?? 'Payé';
        $validated['date_paiement'] = $validated['date_paiement'] ?? now();

        $paiement = Paiement::create($validated);

        return response()->json($paiement, 201);
    }

    public function show(Paiement $paiement)
    {
        return $paiement->load('abonnement');
    }

    public function update(Request $request, Paiement $paiement)
    {
        $validated = $request->validate([
            'montant' => 'sometimes|required|numeric',
            'statut' => 'sometimes|required|in:Payé,En attente,Annulé',
            'date_paiement' => 'sometimes|required|date',
        ]);

        $paiement->update($validated);

        return response()->json($paiement);
    }

    public function destroy(Paiement $paiement)
    {
        $paiement->delete();

        return response()->json(null, 204);
    }

    public function byAbonnement(Abonnement $abonnement)
    {
        return $abonnement->paiements;
    }
}