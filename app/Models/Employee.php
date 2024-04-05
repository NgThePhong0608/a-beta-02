<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'age',
        'phone',
        'address',
        'city',
        'country',
        'department',
        'user_id',
    ];

    public function timeSheets()
    {
        return $this->hasMany(TimeSheet::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
