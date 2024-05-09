<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TimeSheet extends Model
{
    use HasFactory;

    protected $table = 'time_sheet';

    protected $fillable = [
        'employee_id',
        'date',
        'time_in',
        'time_out',
        'duration',
        'status'
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    // local scope
    public function scopeFilter($query)
    {
        $query->when(request('search') ?? false, function ($query, $search) {
            return $query->where(function ($query) use ($search) {
                $query->where('date', 'like', '%' . $search . '%')
                    ->orWhereHas('employee', function ($query) use ($search) {
                        $query->where('fullname', 'like', '%' . $search . '%');
                    })
                    ->orWhere('time_in', 'like', '%' . $search . '%')
                    ->orWhere('time_out', 'like', '%' . $search . '%')
                    ->orWhere('duration', 'like', '%' . $search . '%');
            });
        });
    }

    public function scopeSearchDate($query)
    {
        $query->when(request('startDate') && request('endDate'), function ($query) {
            return $query->whereBetween('date', [request('startDate'), request('endDate')]);
        });
        return $query;
    }
}
