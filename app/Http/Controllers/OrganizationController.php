<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Organizations;

class OrganizationController extends Controller
{
    public function show()
    {
        return Inertia::render('organization/user-organization', [
            'users' => User::select('id','email')->orderBy('email')->get(),
            'organizations' => Organizations::select('id','name')->orderBy('name')->get(),
        ]);
    }

    public function updateUserOrganization(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'organization_id' => 'nullable|exists:organizations,id',
        ]);

        $user = User::findOrFail($data['user_id']);
        $user->organization_id = $data['organization_id'];
        $user->save();

        return redirect()->route('organization.show')->with('success', 'Utilisateur associé à l\'organisation avec succès');
    }
}
