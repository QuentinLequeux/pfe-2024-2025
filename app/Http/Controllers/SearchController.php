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
            $animals = Animals::search($query)->take(3)->get();
        } else {
            $animals = Animals::take(3)->get();
        }

        return response()->json($animals);
        //return Animals::search($request->get('query'))->get();
    }
}
