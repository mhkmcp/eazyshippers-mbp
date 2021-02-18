<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $fillable = [
        'country','city', 'addressLine1', 'addressLine2','addressLine3','typeLocation','setDeafult'
    ];
}

