<?php

namespace App\Models;

use DateTime;
use Exception;
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
        if (!request('startDate') && !request('endDate')) {
            return $query;
        } else if (request('startDate') && !request('endDate')) {
            return $query->where('date', request('startDate'));
        } else if (!request('startDate') && request('endDate')) {
            return
                $query->where('date', request('endDate'));
        }
        return $query->whereBetween('date', [request('startDate'), request('endDate')]);
    }

    public static function calculateDuration($timeIn, $timeOut)
    {
        $dateTimeIn = DateTime::createFromFormat('H:i:s', $timeIn);
        $dateTimeOut = DateTime::createFromFormat('H:i:s', $timeOut);

        if (!$dateTimeIn || !$dateTimeOut) {
            throw new Exception("Invalid time format");
        }

        $interval = $dateTimeIn->diff($dateTimeOut);

        $seconds = $interval->days * 24 * 60 * 60;
        $seconds += $interval->h * 60 * 60;
        $seconds += $interval->i * 60;
        $seconds += $interval->s;

        $decimalHours = $seconds / 3600.0;

        return $decimalHours;
    }
}
