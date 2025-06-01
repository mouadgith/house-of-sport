<?php

namespace App\Http\Controllers;

use App\Models\Adherent;
use Illuminate\Http\Request;

class AdherentController extends Controller
{
    public function index()
    {
        return Adherent::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'date_naissance' => 'nullable|date',
            'sexe' => 'nullable|in:M,F',
            'telephone' => 'nullable|string|max:20',
            'poids' => 'nullable|numeric',
        ]);

        $adherent = Adherent::create($validated);

        return response()->json($adherent, 201);
    }

    public function show(Adherent $adherent)
    {
        return $adherent;
    }

    public function update(Request $request, Adherent $adherent)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:50',
            'prenom' => 'sometimes|required|string|max:50',
            'date_naissance' => 'nullable|date',
            'sexe' => 'nullable|in:M,F',
            'telephone' => 'nullable|string|max:20',
            'poids' => 'nullable|numeric',
        ]);

        $adherent->update($validated);

        return response()->json($adherent);
    }

    public function destroy(Adherent $adherent)
    {
        $adherent->delete();

        return response()->json(null, 204);
    }

    public function abonnements(Adherent $adherent)
    {
        return $adherent->abonnements()->with(['type', 'paiements'])->get();
    }

    public function seances(Adherent $adherent)
    {
        return $adherent->seances()->with(['typeSeance', 'coach', 'salle'])->get();
    }
}