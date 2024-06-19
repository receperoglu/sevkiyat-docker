<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'articles';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'SaleType',
        'CorpId',
        'ArticelName',
        'CustomerName',
        'CreatedDate'
    ];
}
