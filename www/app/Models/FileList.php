<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileList extends Model
{
    protected $table = 'filelist';
    protected $primaryKey = 'Id';
    public $timestamps = false;

    protected $fillable = [
        'ext',
        'Path',
        'Type',
        'ArticelId',
        'OrderId',
        'FileName'
    ];
}
