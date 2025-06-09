<?php

namespace App\Http\Controllers;

use Storage;
use Inertia\Inertia;
use App\Enums\Gender;
use App\Models\Breeds;
use App\Models\Animals;
use App\Enums\AnimalStatus;
use Illuminate\Http\Request;
use App\Concerns\HandleImageUpload;

class AnimalController extends Controller
{
    use HandleImageUpload;

    public function show()
    {
        return Inertia::render('animals/animals', [
            'success' => session('success'),
            'animals' => Animals::with('breed')
                ->inRandomOrder()
                ->paginate(10)]);
        {/*->through(function ($animal) {
                $animal->photo_url = Storage::disk('s3')->url($animal->photo);
                return $animal;
            })]);*/}
    }

    public function create()
    {
        $user = auth()->user();

        if (!$user->organization) {
            return redirect()->route('animals')->with('access', 'Vous devez appartenir à une organisation pour ajouter un animal.');
        }

        return Inertia::render('animals/create', [
            'organization' => $user->organization,
            'statuses' => AnimalStatus::cases(),
            'breeds' => Breeds::all(),
            'gender' => Gender::cases()
        ]);
    }

    public function edit(Animals $animal)
    {
        $user = auth()->user();

        if (!$user->organization) {
            return redirect()->route('animals.show', $animal)->with('access', 'Vous devez appartenir à une organisation pour modifier un animal.');
        }

        return Inertia::render('animals/edit', [
            'animal' => $animal,
            'organization' => $user->organization,
            'statuses' => AnimalStatus::cases(),
            'breeds' => Breeds::all(),
            'gender' => Gender::cases()
        ]);
    }

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
            'description' => 'nullable|string|max:2000'
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $this->storeAndResizeImage($request->file('photo'));
        }

        Animals::create($validated);

        return redirect()->route('animals')->with('success', 'Animal ajouté avec succès !');
    }

    public function destroy(Animals $animal)
    {
        $user = auth()->user();

        if (!$user->organization) {
            return redirect()->route('animals.show', $animal)->with('access', 'Vous devez appartenir à une organisation pour supprimer un animal.');
        }
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
            //'photo' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:1024',
            'description' => 'nullable|string|max:2000'
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
