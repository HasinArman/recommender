<?php

namespace App\Services;

use App\Models\HealthProfile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ClinicalTrialsApi
{
    private const BASE_URL = 'https://clinicaltrials.gov/api/v2/studies';

    /**
     * @return array<int, array<string, mixed>>
     */
    public function search(HealthProfile $profile, int $pageSize = 30): array
    {
        try {
            $response = Http::timeout(20)
                ->acceptJson()
                ->get(self::BASE_URL, [
                    'query.cond' => $profile->condition,
                    'query.term' => implode(' ', $profile->keywordList()),
                    'pageSize' => $pageSize,
                    'format' => 'json',
                ]);

            if (! $response->successful()) {
                return $this->demoTrials($profile);
            }

            $studies = $response->json('studies', []);

            if (empty($studies)) {
                return $this->demoTrials($profile);
            }

            return array_map(fn (array $study) => $this->normalizeStudy($study), $studies);
        } catch (\Throwable $e) {
            Log::warning('ClinicalTrials.gov API failed: '.$e->getMessage());

            return $this->demoTrials($profile);
        }
    }

    /**
     * @param  array<string, mixed>  $study
     * @return array<string, mixed>
     */
    private function normalizeStudy(array $study): array
    {
        $protocol = $study['protocolSection'] ?? [];
        $ident = $protocol['identificationModule'] ?? [];
        $status = $protocol['statusModule'] ?? [];
        $design = $protocol['designModule'] ?? [];
        $eligibility = $protocol['eligibilityModule'] ?? [];
        $description = $protocol['descriptionModule'] ?? [];
        $locations = $protocol['contactsLocationsModule']['locations'] ?? [];

        $locationStrings = collect($locations)
            ->take(5)
            ->map(fn ($loc) => trim(implode(', ', array_filter([
                $loc['facility'] ?? null,
                $loc['city'] ?? null,
                $loc['state'] ?? null,
                $loc['country'] ?? null,
            ]))))
            ->filter()
            ->values()
            ->all();

        return [
            'nct_id' => $ident['nctId'] ?? 'NCT00000000',
            'title' => $ident['briefTitle'] ?? $ident['officialTitle'] ?? 'Untitled study',
            'status' => $status['overallStatus'] ?? 'Unknown',
            'phases' => $design['phases'] ?? [],
            'summary' => $description['briefSummary'] ?? $description['detailedDescription'] ?? '',
            'eligibility_criteria' => $eligibility['eligibilityCriteria'] ?? '',
            'min_age' => $eligibility['minimumAge'] ?? null,
            'max_age' => $eligibility['maximumAge'] ?? null,
            'sex' => $eligibility['sex'] ?? 'ALL',
            'locations' => $locationStrings,
            'url' => 'https://clinicaltrials.gov/study/'.($ident['nctId'] ?? ''),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function demoTrials(HealthProfile $profile): array
    {
        $condition = $profile->condition;
        $city = $profile->city ?? 'your area';
        $country = $profile->country;

        return [
            [
                'nct_id' => 'NCT-DEMO-001',
                'title' => "Lifestyle Intervention Study for Adults with {$condition}",
                'status' => 'RECRUITING',
                'phases' => ['PHASE3'],
                'summary' => "Evaluates structured diet and physical activity support compared with standard care in patients with {$condition}.",
                'eligibility_criteria' => "Ages 40-65. Confirmed {$condition}. Able to attend visits in {$country}.",
                'min_age' => '40 Years',
                'max_age' => '65 Years',
                'sex' => 'ALL',
                'locations' => ["{$city}, {$country}", "Berlin, {$country}"],
                'url' => 'https://clinicaltrials.gov/',
            ],
            [
                'nct_id' => 'NCT-DEMO-002',
                'title' => "Medication Optimization Trial in {$condition}",
                'status' => 'RECRUITING',
                'phases' => ['PHASE2'],
                'summary' => 'Compares two treatment strategies to improve long-term disease control and quality of life.',
                'eligibility_criteria' => "Adults with {$condition}. Stable medication for 3+ months.",
                'min_age' => '18 Years',
                'max_age' => '75 Years',
                'sex' => 'ALL',
                'locations' => ["Munich, {$country}", "Hamburg, {$country}"],
                'url' => 'https://clinicaltrials.gov/',
            ],
            [
                'nct_id' => 'NCT-DEMO-003',
                'title' => "Digital Monitoring Program for {$condition} Patients",
                'status' => 'ACTIVE_NOT_RECRUITING',
                'phases' => ['PHASE4'],
                'summary' => 'Tests whether mobile app monitoring and nurse check-ins reduce complications over 12 months.',
                'eligibility_criteria' => "Diagnosis of {$condition}. Smartphone access required.",
                'min_age' => '21 Years',
                'max_age' => '70 Years',
                'sex' => 'ALL',
                'locations' => ["{$country} (multi-site)"],
                'url' => 'https://clinicaltrials.gov/',
            ],
            [
                'nct_id' => 'NCT-DEMO-004',
                'title' => "Prevention and Early Detection Study ({$condition})",
                'status' => 'RECRUITING',
                'phases' => ['PHASE3'],
                'summary' => 'Investigates screening protocols and early interventions to slow disease progression.',
                'eligibility_criteria' => "Risk factors or early-stage {$condition}. Age 30-60.",
                'min_age' => '30 Years',
                'max_age' => '60 Years',
                'sex' => 'FEMALE',
                'locations' => ["Vienna, Austria", "Zurich, Switzerland"],
                'url' => 'https://clinicaltrials.gov/',
            ],
            [
                'nct_id' => 'NCT-DEMO-005',
                'title' => "Combination Therapy Safety Study — {$condition}",
                'status' => 'RECRUITING',
                'phases' => ['PHASE1', 'PHASE2'],
                'summary' => 'Assesses safety and tolerability of a new combination treatment in a controlled clinical setting.',
                'eligibility_criteria' => "Moderate {$condition}. No recent surgery.",
                'min_age' => '25 Years',
                'max_age' => '55 Years',
                'sex' => 'MALE',
                'locations' => ["Frankfurt, {$country}"],
                'url' => 'https://clinicaltrials.gov/',
            ],
        ];
    }
}
