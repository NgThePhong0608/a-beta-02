<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimeSheetResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'time_in' => $this->time_in,
            'time_out' => $this->time_out,
            'duration' => $this->duration,
            'status' => $this->status,
            'employee' => new EmployeeResource($this->employee),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
