<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use Illuminate\Http\Request;

class CoachController extends Controller
{
    public function index()
    {
        return Coach::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
        ]);

        $coach = Coach::create($validated);

        return response()->json($coach, 201);
    }

    public function show(Coach $coach)
    {
        return $coach;
    }

    public function update(Request $request, Coach $coach)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:50',
            'prenom' => 'sometimes|required|string|max:50',
            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
        ]);

        $coach->update($validated);

        return response()->json($coach);
    }

    public function destroy(Coach $coach)
    {
        $coach->delete();

        return response()->json(null, 204);
    }

    public function seances(Coach $coach)
    {
        return $coach->seances()->with(['typeSeance', 'salle'])->get();
    }
}