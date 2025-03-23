<?php

namespace App\Http\Controllers;

use App\Models\Animals;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('query');

//        if ($query) {
//            // Effectuer la recherche et inclure les noms de la race et de l'espèce
//            $animals = Animals::with('breed')  // Ajouter les relations
//            ->search($query)
//                ->take(3)
//                ->get(); // Récupère jusqu'à trois résultats de recherche.
//        } else {
//            // Récupérer trois animaux avec leurs relations
//            $animals = Animals::with('breed')
//                ->take(3)
//                ->get();
//        }

        if ($query) {
            $animals = Animals::search($query)->take(3)->get(); // Récupère jusqu'à trois résultats de recherche.
        } else {
            $animals = Animals::query()->inRandomOrder()->limit(3)->get(); // Récupère trois animaux aléatoires à afficher par défaut.
        }

        return response()->json($animals);
    }
}
