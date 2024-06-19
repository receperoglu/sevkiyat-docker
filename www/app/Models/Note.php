<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $table = 'notes';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'ArticelId',
        'content',
    ];

    // Eğer Article modeliyle ilişkiliyse:
    public function article()
    {
        return $this->belongsTo(Article::class, 'ArticelId', 'id');
    }
}
