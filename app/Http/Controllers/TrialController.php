<?php

namespace App\Http\Controllers;

use App\Services\TrialMatchingEngine;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrialController extends Controller
{
    public function index(Request $request, TrialMatchingEngine $engine): Response|RedirectResponse
    {
        $profile = $request->user()->healthProfile;

        if (! $profile) {
            return redirect()->route('profile.edit');
        }

        $trials = $engine->recommend($profile);

        return Inertia::render('Trials/Index', [
            'profile' => [
                'condition' => $profile->condition,
                'age' => $profile->age,
                'sex' => $profile->sex,
                'country' => $profile->country,
                'city' => $profile->city,
                'keywords' => $profile->keywords,
            ],
            'trials' => $trials,
            'total' => $trials->count(),
        ]);
    }

    public function show(Request $request, TrialMatchingEngine $engine, string $nctId): Response|RedirectResponse
    {
        $profile = $request->user()->healthProfile;

        if (! $profile) {
            return redirect()->route('profile.edit');
        }

        $trials = $engine->recommend($profile, 50);
        $trial = $trials->firstWhere('nct_id', $nctId);

        if (! $trial) {
            abort(404);
        }

        return Inertia::render('Trials/Show', [
            'trial' => $trial,
            'profile' => [
                'condition' => $profile->condition,
                'age' => $profile->age,
            ],
        ]);
    }
}
