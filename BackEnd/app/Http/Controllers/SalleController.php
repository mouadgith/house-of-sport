<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use Illuminate\Http\Request;

class SalleController extends Controller
{
    public function index()
    {
        return Salle::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:50',
            'capacite_max' => 'nullable|integer|min:1',
            'description' => 'nullable|string',
        ]);

        $salle = Salle::create($validated);

        return response()->json($salle, 201);
    }

    public function show(Salle $salle)
    {
        return $salle;
    }

    public function update(Request $request, Salle $salle)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:50',
            'capacite_max' => 'nullable|integer|min:1',
            'description' => 'nullable|string',
        ]);

        $salle->update($validated);

        return response()->json($salle);
    }

    public function destroy(Salle $salle)
    {
        $salle->delete();

        return response()->json(null, 204);
    }

    public function seances(Salle $salle)
    {
        return $salle->seances()->with(['typeSeance', 'coach'])->get();
    }
}