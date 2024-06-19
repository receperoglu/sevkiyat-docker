<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesType extends Model
{
    protected $table = 'salestypes';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'Name'
    ];
}
