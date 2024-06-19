<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WayBill extends Model
{
    protected $table = 'waybill';
    protected $primaryKey = 'WayBillId';
    public $timestamps = false;

    protected $fillable = [
        'CorpId',
        'CorpName',
        'ArticelId',
        'ArticelName',
        'Dimensions',
        'ProductTypeName',
        'Color',
        'ReelPiece',
        'SendEdPiece',
        'OrderId',
        'CreatedDate',
        'SaleTypeName',
        'Metrics',
        'SaleTypeId'
    ];
}
