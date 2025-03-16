<?php

namespace App\Http\Controllers;

use App\Models\Animals;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('query');

        if ($query) {
            $animals = Animals::search($query)->take(3)->get(); // Récupère jusqu'à trois résultats de recherche.
        } else {
            $animals = Animals::take(3)->get(); // Récupère trois animaux à afficher par défaut.
        }

        return response()->json($animals);
    }
}
