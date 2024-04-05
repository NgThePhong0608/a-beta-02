<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSheet extends Model
{
    use HasFactory;

    protected $table = 'time_sheet';

    protected $fillable = [
        'employee_id',
        'date',
        'time_in',
        'time_out',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
