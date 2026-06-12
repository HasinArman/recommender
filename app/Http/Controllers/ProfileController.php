<?php

namespace App\Http\Controllers;

use App\Models\HealthProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $profile = $request->user()->healthProfile;

        return Inertia::render('Profile/Edit', [
            'profile' => $profile ? [
                'condition' => $profile->condition,
                'age' => $profile->age,
                'sex' => $profile->sex,
                'country' => $profile->country,
                'city' => $profile->city,
                'keywords' => $profile->keywords,
            ] : null,
            'conditions' => $this->commonConditions(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'condition' => ['required', 'string', 'max:120'],
            'age' => ['required', 'integer', 'min:18', 'max:100'],
            'sex' => ['required', 'in:ALL,MALE,FEMALE'],
            'country' => ['required', 'string', 'max:64'],
            'city' => ['nullable', 'string', 'max:80'],
            'keywords' => ['nullable', 'string', 'max:200'],
        ]);

        HealthProfile::query()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $validated,
        );

        return redirect()->route('trials.index')->with('success', 'Profile saved. Finding matching trials…');
    }

    /**
     * @return array<int, string>
     */
    private function commonConditions(): array
    {
        return [
            'Type 2 Diabetes',
            'Type 1 Diabetes',
            'Hypertension',
            'Heart Failure',
            'Coronary Artery Disease',
            'Asthma',
            'COPD',
            'Breast Cancer',
            'Lung Cancer',
            'Prostate Cancer',
            'Colorectal Cancer',
            'Depression',
            'Anxiety',
            'Obesity',
            'Rheumatoid Arthritis',
            'Multiple Sclerosis',
            'Parkinson\'s Disease',
            'Alzheimer\'s Disease',
            'Migraine',
            'Epilepsy',
            'HIV/AIDS',
            'Hepatitis C',
            'Chronic Kidney Disease',
            'Liver Disease',
            'Psoriasis',
        ];
    }
}
