<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class StaffType.
 *
 * @package App\Models
 */
class StaffType extends Model
{
    protected $guarded = [];

    /**
     * Find by name.
     *
     * @param $name
     * @return mixed
     */
    public static function findByName ($name) {
        return static::where('name','=',$name)->first();
    }
}
