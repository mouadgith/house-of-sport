<?php

namespace App\Http\Controllers;

use App\Models\Adherent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdherentController extends Controller
{
    public function index()
    {
        $adherents = Adherent::all();
        return response()->json($adherents);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'email' => 'required|email|unique:adherents',
            'telephone' => 'required|string|max:20',
            'adresse' => 'required|string',
            'poids' => 'required|numeric|min:0|max:300',
            'condition_medicale' => 'required|string',
            'sexe' => 'required|in:M,F',
            'date_naissance' => 'required|date',
            'date_inscription' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $adherent = Adherent::create($request->all());
        return response()->json($adherent, 201);
    }

    public function show($id)
    {
        $adherent = Adherent::find($id);
        if (!$adherent) {
            return response()->json(['message' => 'Adhérent non trouvé'], 404);
        }
        return response()->json($adherent);
    }

    public function update(Request $request, $id)
    {
        $adherent = Adherent::find($id);
        if (!$adherent) {
            return response()->json(['message' => 'Adhérent non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|required|string|max:50',
            'prenom' => 'sometimes|required|string|max:50',
            'email' => 'sometimes|required|email|unique:adherents,email,' . $id,
            'telephone' => 'sometimes|required|string|max:20',
            'adresse' => 'sometimes|required|string',
            'poids' => 'sometimes|required|numeric|min:0|max:300',
            'condition_medicale' => 'sometimes|required|string',
            'sexe' => 'sometimes|required|in:M,F',
            'date_naissance' => 'sometimes|required|date',
            'date_inscription' => 'sometimes|required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $adherent->update($request->all());
        return response()->json($adherent);
    }

    public function destroy($id)
    {
        $adherent = Adherent::find($id);
        if (!$adherent) {
            return response()->json(['message' => 'Adhérent non trouvé'], 404);
        }

        $adherent->delete();
        return response()->json(['message' => 'Adhérent supprimé avec succès']);
    }

    public function search(Request $request)
    {
        $query = Adherent::query();

        if ($request->has('nom')) {
            $query->where('nom', 'like', '%' . $request->nom . '%');
        }

        if ($request->has('prenom')) {
            $query->where('prenom', 'like', '%' . $request->prenom . '%');
        }

        if ($request->has('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }

        if ($request->has('sexe')) {
            $query->where('sexe', $request->sexe);
        }

        $adherents = $query->get();
        return response()->json($adherents);
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