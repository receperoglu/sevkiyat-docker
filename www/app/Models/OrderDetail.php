<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $table = 'orderdetail';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'OrderId',
        'ArticelId',
        'CorpId',
        'Dimensions',
        'ProductTypeName',
        'Color',
        'Piece',
        'CreatedDate',
        'SaleTypeName',
        'Metrics',
        'SaleTypeId'
    ];
}
