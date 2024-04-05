<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
            'name' => $this->fullname,
            'age' => $this->age,
            'phone' => $this->phone,
            'address' => $this->address,
            'city' => $this->city,
            'country' => $this->country,
            'department' => $this->department,
            'user' => new UserResource($this->user),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
