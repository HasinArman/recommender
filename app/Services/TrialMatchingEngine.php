<?php

namespace App\Services;

use App\Models\HealthProfile;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class TrialMatchingEngine
{
    public function __construct(
        private ClinicalTrialsApi $api,
    ) {}

    /**
     * @return Collection<int, array<string, mixed>>
     */
    public function recommend(HealthProfile $profile, int $limit = 12): Collection
    {
        $trials = $this->api->search($profile);

        return collect($trials)
            ->map(fn (array $trial) => $this->scoreTrial($trial, $profile))
            ->sortByDesc('match_score')
            ->take($limit)
            ->values();
    }

    /**
     * @param  array<string, mixed>  $trial
     * @return array<string, mixed>
     */
    public function scoreTrial(array $trial, HealthProfile $profile): array
    {
        $reasons = [];
        $score = 0.0;

        $haystack = Str::lower(implode(' ', [
            $trial['title'] ?? '',
            $trial['summary'] ?? '',
            $trial['eligibility_criteria'] ?? '',
        ]));

        $condition = Str::lower($profile->condition);

        if ($condition !== '' && Str::contains($haystack, $condition)) {
            $score += 0.35;
            $reasons[] = "Matches your condition: {$profile->condition}";
        }

        if ($this->ageMatches($trial, $profile->age)) {
            $score += 0.25;
            $reasons[] = "Your age ({$profile->age}) fits the eligibility range";
        }

        if ($this->locationMatches($trial, $profile)) {
            $score += 0.2;
            $reasons[] = 'Available in or near your location';
        }

        if ($this->sexMatches($trial, $profile->sex)) {
            $score += 0.1;
            $reasons[] = 'Eligible for your sex';
        }

        foreach ($profile->keywordList() as $keyword) {
            if (Str::contains($haystack, Str::lower($keyword))) {
                $score += 0.05;
                $reasons[] = "Related to your keyword: {$keyword}";
            }
        }

        if (Str::upper($trial['status'] ?? '') === 'RECRUITING') {
            $score += 0.05;
            $reasons[] = 'Currently recruiting participants';
        }

        $score = min(1, $score);

        if (empty($reasons)) {
            $reasons[] = 'Related study from ClinicalTrials.gov — review eligibility with your doctor';
        }

        return [
            ...$trial,
            'match_score' => round($score, 2),
            'match_percent' => (int) round($score * 100),
            'reasons' => array_slice($reasons, 0, 4),
            'phase_label' => $this->formatPhases($trial['phases'] ?? []),
        ];
    }

    /**
     * @param  array<string, mixed>  $trial
     */
    private function ageMatches(array $trial, int $age): bool
    {
        $min = $this->parseAge($trial['min_age'] ?? null);
        $max = $this->parseAge($trial['max_age'] ?? null);

        if ($min === null && $max === null) {
            return true;
        }

        if ($min !== null && $age < $min) {
            return false;
        }

        if ($max !== null && $age > $max) {
            return false;
        }

        return true;
    }

    /**
     * @param  array<string, mixed>  $trial
     */
    private function locationMatches(array $trial, HealthProfile $profile): bool
    {
        $locations = implode(' ', $trial['locations'] ?? []);
        $needle = Str::lower(implode(' ', array_filter([$profile->city, $profile->country])));

        if ($needle === '') {
            return false;
        }

        return Str::contains(Str::lower($locations), Str::lower($profile->country))
            || ($profile->city && Str::contains(Str::lower($locations), Str::lower($profile->city)));
    }

    /**
     * @param  array<string, mixed>  $trial
     */
    private function sexMatches(array $trial, string $sex): bool
    {
        $trialSex = Str::upper($trial['sex'] ?? 'ALL');

        if ($trialSex === 'ALL') {
            return true;
        }

        return $trialSex === Str::upper($sex);
    }

    private function parseAge(?string $value): ?int
    {
        if (! $value) {
            return null;
        }

        if (preg_match('/(\d+)/', $value, $matches)) {
            return (int) $matches[1];
        }

        return null;
    }

    /**
     * @param  array<int, string>  $phases
     */
    private function formatPhases(array $phases): string
    {
        if (empty($phases)) {
            return 'N/A';
        }

        return collect($phases)
            ->map(fn ($p) => str_replace('PHASE', 'Phase ', $p))
            ->implode(' · ');
    }
}
