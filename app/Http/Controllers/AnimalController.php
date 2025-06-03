<?php

namespace App\Http\Controllers;

use App\Models\Animals;
use Illuminate\Http\Request;
use Storage;
use App\Concerns\HandleImageUpload;

class AnimalController extends Controller
{
    use HandleImageUpload;

    public function store(Request $request)
    {
        $validated = $request->validate([
            'organization_id' => 'required|exists:organizations,id',
            'name' => 'required|string|max:100|min:3',
            'age' => 'required|integer|min:0|max:20',
            'weight' => 'nullable|integer|min:1|max:100',
            'arrival_date' => 'required|date',
            'breed_id' => 'required|exists:breeds,id',
            'gender' => 'required|in:Mâle,Femelle',
            'adoption_status' => 'required|in:Disponible,En attente,Adopté',
            'photo' => 'required|image|mimes:jpeg,png,jpg,svg,webp|max:1024',
            'description' => 'nullable|string|max:255'
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $this->storeAndResizeImage($request->file('photo'));
        }

        Animals::create($validated);

        return redirect()->route('animals')->with('success', 'Animal ajouté avec succès !');
    }

    public function destroy(Animals $animal)
    {
        if ($animal->photo) {
            Storage::disk('public')->delete($animal->photo);
        }

        $animal->delete();

        return redirect()->route('animals')->with('success', 'Animal supprimé avec succès !');
    }

    public function update(Request $request, Animals $animal)
    {
        $validated = $request->validate([
            'organization_id' => 'required|exists:organizations,id',
            'name' => 'required|string|max:100|min:3',
            'age' => 'required|integer|min:0|max:20',
            'weight' => 'nullable|integer|min:1|max:100',
            'arrival_date' => 'required|date',
            'breed_id' => 'required|exists:breeds,id',
            'gender' => 'required|in:Mâle,Femelle',
            'adoption_status' => 'required|in:Disponible,En attente,Adopté',
            'photo' => 'required|image|mimes:jpeg,png,jpg,svg,webp|max:1024',
            'description' => 'nullable|string|max:255'
        ]);

        if ($request->hasFile('photo')) {
            if ($animal->photo) {
                Storage::disk('public')->delete($animal->photo);
            }

            $validated['photo'] = $this->storeAndResizeImage($request->file('photo'));
        }

        $animal->update($validated);

        return redirect()->route('animals')->with('success', 'Animal modifié avec succès !');
    }
}
