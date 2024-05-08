<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'image_url',
        'age',
        'phone',
        'address',
        'city',
        'country',
        'department',
        'user_id',
    ];

    public static $DEFAULT_PASSWORD = '123456789';

    public function timeSheets(): HasMany
    {
        return $this->hasMany(TimeSheet::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // local scope

    public function scopeSearch($query)
    {
        if (request('department')) {
            $query->where('department', 'like', '%' . \request('department') . '%');
        }
        if (request('search')) {
            $query->where('fullname', 'like', '%' . \request('search') . '%')
                ->orWhere('phone', 'like', '%' . \request('search') . '%')
                ->orWhereHas("user", function ($query) {
                    $query->where("email", "like", "%" . request("search") . "%");
                })
                ->orWhere('city', 'like', '%' . \request('search') . '%')
                ->orWhere('country', 'like', '%' . \request('search') . '%')
                ->orWhere('address', 'like', '%' . \request('search') . '%')
                ->orWhere('age', 'like', '%' . \request('search') . '%');
        }
        return $query;
    }
}
