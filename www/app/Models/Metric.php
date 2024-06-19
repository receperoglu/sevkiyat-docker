<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Metric extends Model
{
    protected $table = 'metrics';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'Name',
        'Metrics'
    ];
}
