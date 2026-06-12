<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HealthProfile extends Model
{
    protected $fillable = [
        'user_id',
        'condition',
        'age',
        'sex',
        'country',
        'city',
        'keywords',
    ];

    protected function casts(): array
    {
        return [
            'age' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function keywordList(): array
    {
        if (! $this->keywords) {
            return [];
        }

        return array_values(array_filter(array_map('trim', explode(',', $this->keywords))));
    }
}
