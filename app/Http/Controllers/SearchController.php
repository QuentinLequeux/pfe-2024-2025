<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('query');

        if ($query) {
            $animals = Animal::search($query)->take(3)->get(); // Récupère jusqu'à trois résultats de recherche.
            $animals->load('breed');
        } else {
            $animals = Animal::with('breed')->inRandomOrder()->limit(3)->get(); // Récupère trois animaux aléatoires à afficher par défaut.
        }

        return response()->json($animals);
    }
}
