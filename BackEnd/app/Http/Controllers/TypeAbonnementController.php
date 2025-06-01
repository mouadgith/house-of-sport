<?php

namespace App\Http\Controllers;

use App\Models\TypeAbonnement;
use Illuminate\Http\Request;

class TypeAbonnementController extends Controller
{
    public function index()
    {
        return TypeAbonnement::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:50',
            'duree_jours' => 'required|integer|min:1',
            'prix' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $type = TypeAbonnement::create($validated);

        return response()->json($type, 201);
    }

    public function show(TypeAbonnement $typeAbonnement)
    {
        return $typeAbonnement;
    }

    public function update(Request $request, TypeAbonnement $typeAbonnement)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:50',
            'duree_jours' => 'sometimes|required|integer|min:1',
            'prix' => 'sometimes|required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $typeAbonnement->update($validated);

        return response()->json($typeAbonnement);
    }

    public function destroy(TypeAbonnement $typeAbonnement)
    {
        $typeAbonnement->delete();

        return response()->json(null, 204);
    }
}