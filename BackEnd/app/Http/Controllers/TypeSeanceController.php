<?php

namespace App\Http\Controllers;

use App\Models\TypeSeance;
use Illuminate\Http\Request;

class TypeSeanceController extends Controller
{
    public function index()
    {
        return TypeSeance::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:50',
            'date' => 'nullable|date',
            'duree_minutes' => 'nullable|integer|min:1',
        ]);

        $type = TypeSeance::create($validated);

        return response()->json($type, 201);
    }

    public function show(TypeSeance $typeSeance)
    {
        return $typeSeance;
    }

    public function update(Request $request, TypeSeance $typeSeance)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:50',
            'date' => 'nullable|date',
            'duree_minutes' => 'nullable|integer|min:1',
        ]);

        $typeSeance->update($validated);

        return response()->json($typeSeance);
    }

    public function destroy(TypeSeance $typeSeance)
    {
        $typeSeance->delete();

        return response()->json(null, 204);
    }
}