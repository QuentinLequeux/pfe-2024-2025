<?php

namespace App\Http\Controllers;

use App\Models\Animals;
use Illuminate\Http\Request;

class AnimalRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'organization_id' => 'required',
            'name' => 'required|string|max:255|min:3',
            'age' => 'required|integer|min:0|max:20',
            'weight' => 'nullable|integer|min:0|max:100',
            'arrival_date' => 'required',
            'breed_id' => 'required',
            'gender' => 'required',
            'adoption_status' => 'required',
            //'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string|max:255'
        ]);

        Animals::create($validated);

        return redirect()->route('animals');
    }

    public function destroy(Animals $animal)
    {
        $animal->delete();

        return redirect()->route('animals');
    }
}

// TODO: Changer le nom de la classe ? (AnimalController)
// TODO: Vérifier les validations
