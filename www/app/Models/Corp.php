<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Corp extends Model
{
    protected $table = 'corps';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'Name',
        'Adress',
        'VergiNo',
        'VergiDairesi'
    ];
}
